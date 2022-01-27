( set -x; git --version; )

[[ -d distlib-git ]] || git clone https://github.com/pypa/distlib.git distlib-git

while read -r hash describe; do
  echo "Installing distlib ${describe} (${hash})"
  pip install "git+file://$(pwd)/distlib-git/.git@${hash}"
  echo "Building launchers with distlib ${describe} (${hash})"
  python ./build.py "${describe}"
  echo ""
done < <(git --git-dir ./distlib-git/.git log "--pretty=format:%H %(describe:tags=true,abbrev=7)" 0.3.3..0.3.4)
