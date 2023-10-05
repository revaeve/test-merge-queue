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
    console.log('No affected directories found. Skipping changelog update.');
    return;
  }

  const affectedApps = affectedProjects.filter(
    (project) => affectedParsed.graph.nodes[project].type === 'app'
  );

  console.log('Affected apps:', affectedApps);

  affectedApps.forEach((appName) => {
    const fullPath = path.join(__dirname, '../apps/', appName);
    const changelogPath = path.join(fullPath, 'CHANGELOG.md');

    console.log(`Checking for ${changelogPath}`);

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
  });
} catch (e) {
  console.log('Error parsing affected.json. Skipping changelog update.', e);
  return;
}
