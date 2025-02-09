import { generateVueSidebar } from '../lib/vue-sidebar';

jest.mock('fs', () => ({
  existsSync: () => true
}));

describe('test sidebar', () => {
  test('generateVueSidebar should return valid vue config', () => {
    const codeFolder = 'test_folder';
    const title = 'test_folder';
    const srcFolder = 'test_folder';
    const docsFolder = 'test_folder';

    const fileTree = [
      { fullPath: 'src/file1', name: 'file1', path: '/file1', ext: '.js' },
      { fullPath: 'src/file2', name: 'file2', path: '/file2', ext: '.ts' },
      {
        children: [
          { fullPath: 'src/lib/file3', name: 'file3', path: '/file3', ext: '.vue' },
          { fullPath: 'src/lib/_index', name: '_index', path: '/_index', ext: '.js' }
        ],
        name: 'lib'
      }
    ];

    const sidebar = generateVueSidebar({ fileTree, codeFolder, docsFolder, srcFolder, title });

    const result = {
      [`/${codeFolder}/`]: [
        { title, collapsable: false, children: [['', '::vuepress-jsdoc-title::'], 'file1', 'file2'] },
        {
          title: 'lib',
          collapsable: false,
          children: ['src/lib/file3', 'src/lib/_index']
        }
      ]
    };

    expect(sidebar).toEqual(result);
  });
});
