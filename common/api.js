
const requireAll = (fn) =>
function (...args) {
  console.log("fn.length is :" + fn.length, "args.length:" + args.length)
  if (args.length < fn.length) {
    throw new Error('missing required arguments');
  }
  else {
    fn.apply(this, args)
  }
}

// class Test{
//   setName(first){

//   }
// }
// Object.defineProperty(Test.prototype,"setName",{value:requireAll(Test.prototype.setName)})

// new Test().setName("11")

const doRest=(fn) => function(data,...args){
  const restConfig=fn.apply(this);
  console.log("data is %o,restConfig is %o",data,restConfig);
  return  11;
}

function api(target,name,descriptor){
  //非构造函数
  console.log(target);
  const nameNotConstruct=(name)=> "constructor"!=name;
  const propNames= Object.getOwnPropertyNames(target).filter(nameNotConstruct);
  console.log("hahaha",propNames)
  for(let propName of propNames){
    target[propName]=requireAll(doRest(target[propName]))
    // Object.defineProperty(target,propName,{
    //   value:
    // })
  }
}

const apiWithStore=(fn)=>function(...args){
    console.log("apiWithStore"+args)
    fn(args)
}

// exports.api=apiWithStore(api)

const User={
  saveUser:{
    method: 'GET',
    mockUrl: 'page-data-source-mgmt/namespace_workspaces',
    url: 'workspace/namespace_workspaces',
  }
}

apiWithStore(api)(User).saveUser()


