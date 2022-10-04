import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

import './relClientes.css';

function relClientesPDF(clientes) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const RelTitulo = [{
        text: 'Clientes',
        fontSize: 15,
        bold: true,
        margin: [15, 20, 0, 45] //left, top, right, bottom
    }]

    const dados = clientes.map((cliente) => {
        return [
            {
                text: cliente.id, fontSize: 10.
            },
            {
                text: cliente.Nome, fontSize: 9, margin: [0, 2, 0, 2]
            },
            {
                text: cliente.Email, fontSize: 9, margin: [0, 2, 0, 2]
            },
            {
                text: cliente.Tel, fontSize: 9, margin: [0, 2, 0, 2]
            }
        ]
    })


    const RelConteudo =
        [{
            table:
            {
                headerRows: 1,
                widths: ["*", "*", "*", "*"],
                body: [
                    [
                        { text: 'Código', style: 'tableHeader', fontSize: 10 },
                        { text: 'Nome', style: 'tableHeader', fontSize: 10 },
                        { text: 'Email', style: 'tableHeader', fontSize: 10 },
                        { text: 'Telefone', style: 'tableHeader', fontSize: 10 }
                    ],
                    ...dados
                ]
            },
            layout: 'headerLineOnly'
        }]


    function Rodape(currentPage, pageCount) {
        return [
            {
                text: currentPage + '/' + pageCount,
                alignment: 'right',
                fontSize: 9,
                margin: [0, 10, 20, 0] //left, top, right, bottom
            }
        ]
    }


    const RelDefinicao = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],

        header: [RelTitulo],

        content: [RelConteudo],
        
        footer: Rodape
    }

    pdfMake.createPdf(RelDefinicao).download();
}

export default relClientesPDF