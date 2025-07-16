export const getText: () => Promise<string> = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Lorem ipsum dolor sit amet consectetur adipisicing elit");
    }, 200);
  });
};
