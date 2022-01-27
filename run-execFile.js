const { execFile } = require( "child_process" );

if ( process.argv.length < 3 ) {
    console.log( "process parameter missing" );
    process.exit( 1 );
}

const exec = process.argv[ 2 ];
const args = process.argv.slice( 3 );

console.log( "Running via NodeJS - execFile" );
console.log( `Exec: ${JSON.stringify( exec )}` );
console.log( `Args: ${JSON.stringify( args )}` );

const inst = execFile( exec, args, ( err, stdout, stderr ) => {
    console.log( `err: ${err?.toString().trim()}` );
    console.log( `stdout: ${stdout.toString().trim()}` );
    console.log( `stderr: ${stderr.toString().trim()}` );
    console.log( `exit code: ${inst.exitCode}` );
});
