function loadPDF() {
    const pdfName = document.getElementById('pdfName').value;
    const pdfViewer = document.getElementById('pdfViewer');

    const loadingTask = pdfjsLib.getDocument({ url: `${pdfName}.pdf` });

    loadingTask.promise.then(function (pdfDoc) {
        const pdfViewer = document.getElementById('pdfViewer');
        pdfViewer.innerHTML = ''; // Clear previous content

        for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
            const pageContainer = document.createElement('div');
            pageContainer.className = 'page-container';
            pdfViewer.appendChild(pageContainer);

            pdfDoc.getPage(pageNum).then(function (pdfPage) {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                pageContainer.appendChild(canvas);

                const viewport = pdfPage.getViewport({ scale: 1.5 });
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderTask = pdfPage.render({ canvasContext: context, viewport });
                renderTask.promise.then(function () {
                    // Page rendered
                });
            });
        }
    }).catch(function (error) {
        console.error('Error loading PDF:', error);
        pdfViewer.innerHTML = 'PDF not found.';
    });
}

// Call loadPDF initially
loadPDF();
