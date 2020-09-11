var cont = 1;
$('#addIQ').click(function () {
    cont += 1
    console.log(cont)
    var div = $('<div>').attr('class', 'ings')
    var inputlg = $('<input>').attr('type', 'text').attr('id', 'ig' + cont)
    var labelg = $('<label>').text('Ingrediente: ').append(inputlg).attr('for', 'ig' + cont)
    var inputqt = $('<input>').attr('type', 'text').attr('id', 'qt' + cont)
    var labelqt = $('<label>').text('Quantidade: ').append(inputqt).attr('for', 'qt' + cont)
    var btnrm = $('<button>').attr('id', 'rem' + cont).text('Remover')
    btnrm.click(function () {
        $(this).parent().remove()

    })
    div.append(labelg).append(labelqt).append(btnrm)
    $('#ing').append(div)
})
var passo = 0;
$('#addPs').click(function () {
    if ($('[id^="pace"]').length == 0) {
        passo = 0
    }
    passo += 1
    var divtextarea = $('<div>').attr('class', 'pace').attr('id', 'pace' + passo)
    var titulo = $('<h3>').text('Passo ' + passo)
    var textarea = $('<textarea>').attr('placeholder', 'digite um passo da receita').attr('id', 'pas' + passo)
    var divint = $('<div>').attr('id', 'divint')
    var btremove = $('<button>').text('X').attr('id', 'remove' + passo)
    var btnup = $("<button>").text("↑").attr("id", "up" + passo).attr("onclick", `up(${passo})`)
    var btndw = $("<button>").text("↓").attr("id", "down" + passo).attr("onclick", `down(${passo})`)
    btremove.click(function () {
        $(this).parent().parent().remove()
        reorg()
    })
    divint.append(btnup).append(btndw).append(btremove)
    divtextarea.append(titulo).append(textarea).append(divint)
    $('#cont_pace').append(divtextarea)
})

$('#bttr').click(function () {
    reorg()
    var troca1 = $('#tr1').val()
    var troca2 = $('#tr2').val()
    var mediador = ""
    var txarea1 = $(`#pas${troca1}`).val()
    var txarea2 = $(`#pas${troca2}`).val()

    mediador = txarea1
    txarea1 = txarea2
    txarea2 = mediador
    $(`#pas${troca1}`).val(txarea1)
    $(`#pas${troca2}`).val(txarea2)

})

function up(passos) {
    if (passos != 1) {
        var tr1 = $(`#pas${passos}`).val()
        var tr2 = $(`#pas${passos - 1}`).val()
        var med = ""

        med = tr1
        tr1 = tr2
        tr2 = med

        $(`#pas${passos}`).val(tr1)
        $(`#pas${passos - 1}`).val(tr2)

    }

}

function down(passos) {
    if (passo != passos) {
        var tr1 = $(`#pas${passos}`).val()
        var tr2 = $(`#pas${passos + 1}`).val()
        var med = ""

        med = tr1
        tr1 = tr2
        tr2 = med

        $(`#pas${passos}`).val(tr1)
        $(`#pas${passos + 1}`).val(tr2)

    }



}

function reorg() {
    var all = $('[id^="pace"]').toArray()
    var txt = $('[id^="pas"]').toArray()
    var btnup = $('[id^="up"]').toArray()
    var btndw = $('[id^="down"]').toArray()

    for (var i = 0; i < all.length; i++) {
        console.log(all[i])
        $(all[i]).attr('id', 'pace' + (i + 1)).find('h3').text('Passo ' + (i + 1))
        $(txt[i]).attr('id', 'pas' + (i + 1))
        $(btnup[i]).attr('id', 'up' + (i + 1)).attr('onclick', `up(${i + 1})`)
        $(btndw[i]).attr('id', 'down' + (i + 1)).attr('onclick', `down(${i + 1})`)

    }
    passo = all.length



}



$('#save').click(function () {
    var tit = $('#tit').val()
    var aringqtd = ""
    var artext = ""

    var allings = $('[id^=ig]').toArray()
    var allqt = $('[id^=qt]').toArray()
    var alltx = $('[id^=pas').toArray()



    for (i = 0; i < alltx.length; i++) {
        artext += (i + 1) + " " + $(alltx[i]).val() + "\n"
    }
    for (i = 0; i < allings.length; i++) {
        console.log($(allqt[i]).val())
        aringqtd += $(allqt[i]).val() + " - " + $(allings[i]).val() + "\n"
    }

    var conteudo = "ingredientes \n \n" + aringqtd + "\n" + "Modo de Preparo" + "\n\n" + artext
    console.log(conteudo)

    var blob = new Blob([conteudo], { type: "text/plain" })

    download(blob, tit + ".txt")

})
function download(blob, nome) {
    const dwl = document.createElement("a");
    dwl.href = URL.createObjectURL(blob);
    dwl.download = nome;

    document.body.appendChild(dwl);
    dwl.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    document.body.removeChild(dwl);
}











