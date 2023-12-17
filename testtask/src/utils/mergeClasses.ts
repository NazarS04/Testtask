export function mergeClasses(ownClassName:string,options:{[key:string]:string}|undefined){
  let className = ownClassName;

  if (options?.className) {
    className = options.className + " " + className;
    delete options.className;
  }

  return className;
}