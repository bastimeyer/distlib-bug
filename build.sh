distlib="$1"
name="$2"
type="$3"
bitness="$4"

[[ -d distlib-git ]] || git clone https://github.com/pypa/distlib.git distlib-git
pip install --force-reinstall "git+file://$(pwd)/distlib-git/.git@${distlib}"

echo "Building distlib ${distlib} launcher: ${type}${bitness}"
python ./build.py "${name}" "${type}" "${bitness}"
