[[ $# -lt 1 ]] && { echo >&2 "process parameter missing"; exit 1; }

echo "Running via BASH"

file="$1"
shift

echo "Exec: $file"
echo "Args: $@"

"$file" "$@"

echo "Exit code: $?"
