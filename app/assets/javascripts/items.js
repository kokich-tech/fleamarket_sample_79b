$(function(){
  //プレビューのhtmlを定義
  function buildHTML (index) {
    var html = `<div id="image-box-1">
                <div class="item-num-0" id="image-box__container"></div>
                <input type="file" name="item[images_attributes][${index}][src]" id="img-file">
                <label for="img-file"></label>
                </div>`;
    return html;
  }


      
  $('.box__file__field').on('click', function(){
    const fileField = $('input[type="file"]:last');
    fileField.trigger('click');
  })

  // file_fieldのnameに動的なindexをつける為の配列
  let fileIndex = [1,2,3,4,5,6,7,8,9,10];


  $('#box__file__image').on('change', '.item-num-0', function(e) {
    //fileIndexの先頭の数字を使ってinputを作る
    $('.item-num-0').append(buildHTML(fileIndex[0]));
    fileIndex.shift();
    //末尾の数に1足した数を追加する
    fileIndex.push(fileIndex[fileIndex.length - 1] + 1)
  });
  var dataBox = new DataTransfer();
//querySelectorでfile_fieldを取得
var file_field = document.querySelector('input[type=file]')
//fileが選択された時に発火するイベント
$('#img-file').change(function(){
  //選択したfileのオブジェクトをpropで取得
  var files = $('input[type="file"]').prop('files')[0];
  $.each(this.files, function(i, file){
    //FileReaderのreadAsDataURLで指定したFileオブジェクトを読み込む
    var fileReader = new FileReader();

    //DataTransferオブジェクトに対して、fileを追加
    dataBox.items.add(file)
    //DataTransferオブジェクトに入ったfile一覧をfile_fieldの中に代入
    file_field.files = dataBox.files

    var num = $('.item-image').length + 1 + i
    fileReader.readAsDataURL(file);
     //画像が5枚になったら超えたらドロップボックスを削除する
    if (num == 5){
      $('.box__file__field').css('display', 'none')   
    }
    //読み込みが完了すると、srcにfileのURLを格納
    fileReader.onloadend = function() {
      var src = fileReader.result
      var html= `<div class='item-image' data-image="${file.name}">
                  <div class=' item-image__content'>
                    <div class='item-image__content--icon'>
                      <img src=${src} width="124" height="80" >
                    </div>
                  </div>
                  <div class='item-image__operation'>
                    <div class='item-image__operation--delete'>削除</div>
                  </div>
                </div>`
      //要素の前にhtmlを差し込む
      $('.box__file__field').before(html);
    };
    //image-box__containerのクラスを変更し、CSSでドロップボックスの大きさを変える。
    $('#image-box__container').attr('class', `item-num-${num}`)
  });
});
//削除ボタンをクリックすると発火するイベント
$(document).on("click", '.item-image__operation--delete', function(){
  //プレビュー要素を取得
  var target_image = $(this).parent().parent()
  //プレビューを削除
  target_image.remove();

})
});



