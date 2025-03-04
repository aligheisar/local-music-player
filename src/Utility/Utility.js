export let formatText = (text, thereshold = 20) => {
  return text.length > thereshold ? text.slice(0, thereshold) + "..." : text;
};
