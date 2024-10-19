import Prism from 'prismjs';

const LanguageMap: { [key: string]: string } = {
    'py': 'python',
    'md': 'markdown',
    'tsx': 'typescript',
    'jsx': 'javascript',
}

const dependencies: { [key: string]: string } = {
    'cpp': 'cilkc',
}

export const loadPrismLanguage = async (language: keyof typeof LanguageMap) => {
    try {

      if (LanguageMap[language]) {
        language = LanguageMap[language];
      }

      if (dependencies[language]) {
        await require(`prismjs/components/prism-${dependencies[language]}`);
      }
      
      await require(`prismjs/components/prism-${language}`);
    } catch (e) {
      console.warn(`Language ${language} not supported by Prism.js. Falling back to plain text.`);
      return false;
    }
  return true;
};
  