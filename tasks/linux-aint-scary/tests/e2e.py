from pathlib import Path

from toolbox.utils.test_utils import RequestHelper, check_status_code

request = RequestHelper(default_host="linux-aint-scary.hack4krak.pl")
task_path = Path(__file__).parent.parent


def test_static_page_served():
    response = request.get("/")
    check_status_code(response, 200)


def test_v86_assets_served():
    response = request.get("/v86/build/libv86.js")
    check_status_code(response, 200)

    response = request.get("/v86/build/v86.wasm")
    check_status_code(response, 200)


def test_bios_images_served():
    response = request.get("/v86/bios/seabios.bin")
    check_status_code(response, 200)

    response = request.get("/v86/bios/vgabios.bin")
    check_status_code(response, 200)


def test_rootfs_images_served():
    response = request.get("/images/alpine-fs.json")
    check_status_code(response, 200)

    response = request.get("/images/v86state.bin")
    check_status_code(response, 200)

    response = request.get("/images/alpine-rootfs-flat/53c22d52.bin.zst")
    check_status_code(response, 200)
