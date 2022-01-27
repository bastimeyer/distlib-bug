const { spawn } = require( "child_process" );

if ( process.argv.length < 3 ) {
    console.log( "process parameter missing" );
    process.exit( 1 );
}

const exec = process.argv[ 2 ];
const args = process.argv.slice( 3 );

console.log( "Running via NodeJS - spawn" );
console.log( `Exec: ${JSON.stringify( exec )}` );
console.log( `Args: ${JSON.stringify( args )}` );

const inst = spawn( exec, args, {
    detached: false
});
inst.on( "error", e => {
    console.log( `Error: ${e}` );
});
inst.on( "spawn", () => {
    console.log( "Spawned:" );
    inst.stdout.pipe( process.stdout );
    inst.stderr.pipe( process.stderr );
});
inst.on( "close", ( code, signal ) => {
    console.log( `Closed: code=${code}, signal=${signal}` );
});
