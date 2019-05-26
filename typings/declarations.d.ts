/*
declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}
*/
declare module "*.scss" {
  const content: any;
  export default content;
}
