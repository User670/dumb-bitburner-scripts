# semaphore.js
Sync scripts using semaphores.

## Technical notes
This only works because Bitburner treats scripts as the same instance as long as the file contents are the same (and will share script variables), even if they are on different servers or have different file name.

This **will** break if this behavior is changed in future versions of the game.

This semaphore will release waiting scripts in the order the waits come in.

## Usage

### init(id, initialValue=0, overwrite=false)
Initialize a semaphore - if it doesn't exist, it will create one. Returns a semaphore object, but it is not necessary to use this object.

id: unique identifier of the semaphore.

initialValue: initial value of the semaphore variable, if the semaphore needs to be created or overwritten.

overwrite: whether to overwrite an existing semaphore. If set to false, existing semaphore of the same identifier will be left untouched.

### clear(id)
Deletes the semaphore.

id: unique identifier of the semaphore.

### semaphoreObject.wait(n=1), or wait(id, n=1)
This is an async function that needs to be awaited.

Perform the `wait` (P) operation. Can be made to require more than 1 on the semaphore variable by passing in a different value for `n`.

id: unique identifier of the semaphore

n: number required to release this wait

### semaphoreObject.release(n=1), or release(id, n=1)
Perform the `signal` (V) operation. Can increase the semaphore variable by more than 1 by passing in a different value for `n`. (Don't question me why this is called `release()` not `signal()`.

id: unique identifier of the semaphore

n: number to increment the semaphore variable by

## example

controller.js:
```js
import * as semaphore from "semaphore"
export async function main(ns){
    // overwrite to properly init this semaphore
    let mySemaphore = semaphore.init("hack", 0, true)
    for(let i=0; i<5; i++){
        ns.exec("hack.js", "home")
    }
    await mySemaphore.wait(5)
    // or alternatively,
    // semaphore.wait("hack", 5)
    ns.tprint("All worker scripts have finished")
}
```

hack.js:
```js
import * as semaphore from "semaphore"
export async function main(ns){
    // don't overwrite the semaphore
    let mySemaphore = semaphore.init("hack")
    await ns.hack("n00dles")
    mySemaphore.release()
    // or alternatively,
    // semaphore.release("hack")
}
```