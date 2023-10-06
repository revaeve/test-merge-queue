const fs = require('fs');
const path = require('path');

const COMMIT_MESSAGE = process.env.COMMIT_MESSAGE || 'default commit message';

if (!fs.existsSync('./affected.json')) {
  console.log('No affected.json file found. Skipping changelog update.');
  return;
}

const affected = fs.readFileSync('./affected.json', 'utf8');

try {
  const affectedParsed = JSON.parse(affected);
  const affectedProjects = affectedParsed.affectedProjects;

  if (!affectedProjects.length) {
    console.log('No affected apps found. Skipping update.');
    return;
  }

  const affectedApps = affectedProjects.filter(
    (project) => affectedParsed.graph.nodes[project].type === 'app'
  );

  console.log('Affected apps:', affectedApps);

  affectedApps.forEach((appName) => {
    const fullPath = path.join(__dirname, '../apps/', appName);

    // Add commit message to changelog
    const changelogPath = path.join(fullPath, 'CHANGELOG.md');
    if (fs.existsSync(changelogPath)) {
      let changelogContent = fs.readFileSync(changelogPath, 'utf8');
      changelogContent += `\n---\n\n${COMMIT_MESSAGE}\n`;
      fs.writeFileSync(changelogPath, changelogContent, 'utf8');
      console.log(`Updated ${changelogPath}`);
    } else {
      console.log(
        `No CHANGELOG.md found in ${fullPath}. Creating one for you.`
      );
      fs.writeFileSync(changelogPath, `${COMMIT_MESSAGE}\n`, 'utf8');
    }

    // Increase version for affected app
    const packageJsonPath = path.join(fullPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = require(packageJsonPath);
      const version = packageJson.version;
      const versionParts = version.split('.');
      const newVersion = `${versionParts[0]}.${versionParts[1]}.${
        parseInt(versionParts[2]) + 1
      }`;
      packageJson.version = newVersion;
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2),
        'utf8'
      );
      console.log(`Increased version to ${newVersion} in ${packageJsonPath}`);
    } else {
      console.log(
        `No package.json found in ${fullPath}. Creating one for you.`
      );
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify({ version: '0.0.1' }, null, 2),
        'utf8'
      );
    }
  });
} catch (e) {
  console.log('Error parsing affected.json. Skipping changelog update.', e);
  return;
}
