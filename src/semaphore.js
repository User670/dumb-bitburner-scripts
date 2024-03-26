class SemaphoreWaitPromise{
    requiredCount=1;
    promiseResolve;
    promiseReject;
    promise;
    
    constructor(requiredCount=1){
        this.requiredCount=requiredCount
        this.promise=new Promise((resolve, reject)=>{
            this.promiseResolve=resolve;
            this.promiseReject=reject;
        });
    }
}

class Semaphore{
    counter=0;
    waits=[];
    
    constructor(initialCounter=0){
        this.counter=initialCounter
    }
    
    release(n=1){
        this.counter+=n
        // resolve waits
        while(this.waits.length>0 && this.waits[0].requiredCount<=this.counter){
            this.counter-=this.waits[0].requiredCount
            this.waits[0].promiseResolve()
            this.waits.shift()
        }
    }
    
    wait(n=1){
        if(this.counter>=n){
            this.counter-=n
            return
        }
        let waitPromise=new SemaphoreWaitPromise(n)
        this.waits.push(waitPromise)
        return waitPromise.promise
    }
}

let semaphores={}

export function init(id, initialValue=0, overwrite=false){
    if(overwrite==true ||!(id in semaphores)){
        semaphores[id]=new Semaphore(initialValue)
    }
    return semaphores[id]
}

export function clear(id){
    delete semaphores[id]
}

export function wait(id, n=1){
    return semaphores[id].wait(n)
}

export function release(id, n=1){
    semaphores[id].release(n)
}