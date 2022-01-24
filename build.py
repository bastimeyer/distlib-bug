import distlib.scripts
import io
import os.path as osp
import sys
from distlib import __version__ as distlibversion
from pathlib import Path
from zipfile import ZipFile


SCRIPT = """import sys

if __name__ == '__main__':
    print(sys.argv)
    sys.exit(0)
"""

def find_exe(bitness=32, console=True):
    distlib_dir = osp.dirname(distlib.scripts.__file__)
    name = "t" if console else "w"
    return osp.join(distlib_dir, f"{name}{bitness}.exe")

def build(name, commands):
    for bitness, console in commands:
        suffix = "" if console else "w"
        exe_path = Path(".") / f"{name}-distlib{distlibversion}-{suffix}{bitness}.exe"

        # 1. Get the base launcher exe from distlib
        with open(find_exe(bitness, console), "rb") as f:
            launcher_b = f.read()

        # 2. Shebang
        shebang = f"#!<launcher_dir>\\python{bitness}\\python{suffix}.exe\r\n".encode("utf-8")

        # 3. Script contents
        zip_bio = io.BytesIO()
        with ZipFile(zip_bio, "w") as zf:
            zf.writestr("__main__.py", SCRIPT.encode("utf-8"))

        # Put the pieces together
        with exe_path.open("wb") as f:
            f.write(launcher_b)
            f.write(shebang)
            f.write(zip_bio.getvalue())


if __name__ == "__main__":
    build("launcher", (
        (32, True),
        (32, False),
        (64, True),
        (64, False),
    ))
