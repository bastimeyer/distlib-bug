const { spawn } = require( "child_process" );
const { argv, stderr, stdout } = require( "process" );


( async () => {
    if ( process.argv.length < 3 ) { return; }

    console.log( `SPAWNING: ${JSON.stringify( argv.slice( 2 ) )}` );
    const child = await new Promise( ( resolve, reject ) => {
        const child = spawn( argv[ 2 ], argv.slice( 3 ), {
            detached: true
        });
        child.on( "error", reject );
        child.on( "close", status => console.log( `CLOSED CHILD (${child.pid}): ${status}` ) );
        child.on( "spawn", () => resolve( child ) );
        child.stderr.pipe( stderr );
        child.stdout.pipe( stdout );
    });

    console.log( "WAITING 5 SECONDS, THEN KILLING CHILD PROCESS" );
    await new Promise( resolve => setTimeout( resolve, 5000 ) );

    console.log( `KILLING CHILD: ${child.pid}` );
    const success = child.kill();
    console.log( `KILL SUCCESS? ${success}` );
})();
