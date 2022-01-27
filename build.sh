( set -x; git --version; )

[[ -d distlib-git ]] || git clone https://github.com/pypa/distlib.git distlib-git

while read -r hash; do
  describe=$(git --git-dir ./distlib-git/.git describe --tags "${hash}")
  echo "Installing distlib ${describe} (${hash})"
  pip install "git+file://$(pwd)/distlib-git/.git@${hash}"
  echo "Building launchers with distlib ${describe} (${hash})"
  python ./build.py "${describe}"
  echo ""
done < <(git --git-dir ./distlib-git/.git log "--pretty=format:%H" 0.3.3~1..0.3.4)
