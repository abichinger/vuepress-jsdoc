/*
 * @vuepress
 * ---
 * headline: cmds.ts
 * ---
 */
import { program } from 'commander';

import { generate } from '.';

/**
 * This method builds the cli interface and is necessary because
 * we need the version from the package.json here. We do not import
 * this here, because otherwise the folder structure in the dist folder would get mixed up.
 * @param {string} version a version string
 */
export default (version: string) => {
  program.version(version).description('a CLI Tool to generate markdown files for vuepress');

  program
    .description('Generate the md files')
    .option('-s, --source <string>', 'Source folder with .js or .ts files', './src')
    .option('-d, --dist <string>', 'Destination folder', './documentation')
    .option('-f, --folder <string>', 'Folder inside destination folder. Gets overwritten everytime', 'code')
    .option('-t, --title <string>', 'Title of your documentation', 'API')
    .option('-r, --readme <string>', 'Path to your custom readme')
    .option('-i, --include <string>', 'Pattern to include files (Comma seperated) - *.test.js,include.js', '**/*')
    .option('-e, --exclude <string>', 'Pattern to exclude files (Comma seperated) - *.test.js,exclude.js')
    .option('-w, --watch', 'This flag watches your source files')
    .option(
      '-rm, --rmPattern [files...]',
      'Pattern when removing files. You can ex- and include files. (glob pattern)',
      ''
    )
    .option('-p, --partials [files...]', 'jsdoc2markdown partial templates (overwrites default ones)', '')
    .option('-c, --jsDocConfigPath <string>', 'Path to jsdoc config')
    .action(generate);

  program.parse(process.argv);
};
