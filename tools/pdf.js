import jsPDF from "jspdf"
const generatePdf = (id, filename) => {
    const content = document.getElementById(id)
    const doc = new jsPDF('p','pt','a4')
    doc.html(content, {
        callback: (pdf) => pdf.save(`invoice_${filename}.pdf`)
    })
}


export {generatePdf}