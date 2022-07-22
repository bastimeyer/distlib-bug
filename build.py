import distlib.scripts
import io
import sys
from pathlib import Path
from zipfile import ZipFile


SCRIPT = """
from time import sleep

max = 20
for num in range(max):
    print(f"RUNNING PYTHON SCRIPT... STEP {num}/{max}")
    sleep(1)

print("PYTHON SCRIPT ENDED")
"""


def build(name, launcher, bitness):
    suffix = "" if launcher == "t" else "w"
    exe_input = Path(distlib.scripts.__file__).parent / f"{launcher}{bitness}.exe"
    exe_output = Path(".") / f"{name}-{launcher}{bitness}.exe"

    # 1. Get the base launcher exe from distlib
    with exe_input.open("rb") as f:
        launcher_b = f.read()

    # 2. Shebang
    shebang = f"#!<launcher_dir>\\python{bitness}\\python{suffix}.exe\r\n".encode("utf-8")

    # 3. Script contents
    zip_bio = io.BytesIO()
    with ZipFile(zip_bio, "w") as zf:
        zf.writestr("__main__.py", SCRIPT.encode("utf-8"))

    # Put the pieces together
    with exe_output.open("wb") as f:
        f.write(launcher_b)
        f.write(shebang)
        f.write(zip_bio.getvalue())


if __name__ == "__main__":
    build(*sys.argv[1:4])
