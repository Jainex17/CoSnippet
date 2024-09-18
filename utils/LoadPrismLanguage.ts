export const loadPrismLanguage = (language:string) => {
    try {
      require(`prismjs/components/prism-${language}`);
    } catch (e) {
      console.warn(`Language ${language} not supported by Prism.js. Falling back to plain text.`);
      return false;
    }
  return true;
};
  