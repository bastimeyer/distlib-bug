const { execFileSync } = require( "child_process" );

if ( process.argv.length < 3 ) {
    console.log( "process parameter missing" );
    process.exit( 1 );
}

const exec = process.argv[ 2 ];
const args = process.argv.slice( 3 );

console.log( "Running via NodeJS - execFileSync" );
console.log( `Exec: ${JSON.stringify( exec )}` );
console.log( `Args: ${JSON.stringify( args )}` );

const out = execFileSync( exec, args );
console.log( `stdout: ${out.toString()}` );
