require('dotenv').config()
const { exec } = require('child_process')

// big ugly super command
let syncCommand = `
  dropdb --if-exists -h ${process.env.LOCAL_DB_HOST} -U ${process.env.LOCAL_DB_USER} ${process.env.LOCAL_DB_NAME} &&
  createdb -h ${process.env.LOCAL_DB_HOST} -U ${process.env.LOCAL_DB_USER} ${process.env.LOCAL_DB_NAME} &&
  PGPASSWORD="${process.env.REMOTE_DB_PASSWORD}" pg_dump -h ${process.env.REMOTE_DB_HOST} -O -U ${process.env.REMOTE_DB_USER} ${process.env.REMOTE_DB_NAME} | PGPASSWORD="${process.env.LOCAL_DB_PASSWORD}" psql -h ${process.env.LOCAL_DB_HOST} -U ${process.env.LOCAL_DB_USER} ${process.env.LOCAL_DB_NAME}`

// log out the command string
console.log(`Running:\n${syncCommand}\n\n`)

// run the script, log out any errors
exec(syncCommand, function(err, stdout, stderr) {
  if (err) {
    console.log(err.stack)
    console.log('Error code: ' + err.code)
    console.log('Signal received: ' + err.signal)
  }
  // console.log('Child Process STDOUT: ' + stdout)
  // console.log('Child Process STDERR: ' + stderr)
  console.log(
    `Success!\nLocal database, ${process.env.LOCAL_DB_NAME}, has the latest data from the remote database.`,
  )
})