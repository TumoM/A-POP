import {getVideoString} from "./DownloadUtils";

console.log('Fetching Data');
getVideoString()
.then((res:string) => {
  console.log(res.substr(0,100)); 
}
)
.catch((e) => {
  console.log(e);
  
}
)