async function convertImage(event) {
    event.preventDefault();
    const inputFile = document.getElementById("imageInput");
    const outputImage = document.getElementById("convertedImage");
    const outputContainer = document.getElementById("output-image");
    const downloadLink = document.getElementById("downloadLink");
    const targetFormat = document.getElementById("targetFormat").value;
    const baseUrl = "";

    // Check if an image is selected
    if (!inputFile.files[0]) {
        alert("Please select an image before converting.");
        return;
    }

    const file = inputFile.files[0];

    const formData = new FormData();
    formData.append("image", file);

    const acceptableFormat = [
        "jpeg",
        "jpg",
        "jpe",
        "png",
        "avif",
        "tiff",
        "tif",
        "webp",
    ];
    const isAcceptableFormat = acceptableFormat.some((el) => {
        return el === targetFormat;
    });

    if (!isAcceptableFormat) {
        alert("the target format not acceptable");
        return;
    }

    // Send POST request with image and target format
    fetch(`${baseUrl}/processImage/${targetFormat}`, {
        method: "POST",
        body: formData,
    })
        .then(async function (response) {
            // if status not 200 send the error
            if (!response.ok) {
                throw new Error(
                    `Failed to convert image. Status: ${response.status}`
                );
            } else {
                outputContainer.style.display = "block";
            }

            const blob = await response.blob();
            return blob;
        })
        .then(function (blob) {
            const imageUrl = URL.createObjectURL(blob);
            downloadLink.href = imageUrl;
            downloadLink.download = `${imageUrl}`;
            downloadLink.style.display = "block";
        })
        .catch(function (error) {
            console.error(error);
            alert(error);
        });
    for (var key of formData.keys()) {
        // here you can add filtering conditions
        formData.delete(key);
    }
}
