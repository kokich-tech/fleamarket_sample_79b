document.addEventListener("turbolinks:load", (function(){
  //プレビューのhtmlを定義
  function buildHTML (index) {
    let html = `<div class="image-box-1">
                <div class="item-num-0" id="image-box__container"></div>
                <input type="file" name="item[item_images_attributes][${index}][src]" id="item_item_images_attributes_${index}_src" data-index="${index}" class="test">
                <label for="img-file"></label>
                </div>`;
    return html;
  }


      
  $('.box__file__field').on('click', function(){

    // const fileField = $('input[type="file"]:last');
    const fileField = $(".test:last");
    fileField.trigger('click');
    console.log("1")
  })

  $('.item-image__content').on('click', function(){
    var index = $(this).data("index");
    
    // const fileField = $('input[type="file"]:last');
    // const fileField = $(".test:last");
    // fileField.trigger('click');

    $(`#item_item_images_attributes_${index}_src`).trigger("click");
    console.log("2")
  })


  // file_fieldのnameに動的なindexをつける為の配列
  let fileIndex = [1,2,3,4,5,6,7,8,9,10];


  $('.box__file').on('change', `input[type="file"]`, function(e) {
  //fileIndexの先頭の数字を使ってinputを作る
  let index = $(this).data("index");
  console.log(index)
  $('.box__file').append(buildHTML(fileIndex[0]));

    fileIndex.shift();
    //末尾の数に1足した数を追加する
    fileIndex.push(fileIndex[fileIndex.length - 1] + 1)
    $.each(this.files, function(i, file){
     


      if ($(`.item-image__content[data-index="${index}"]`)[0]) {
        let fileReader = new FileReader();
        dataBox.items.add(file)
        fileReader.readAsDataURL(file);
        fileReader.onloadend = function() {
        let src = fileReader.result
        
        const edit_image = $(`.item-image__content[data-index="${index}"]`).children("img");
        edit_image.attr("src", src);
        
        }
        return false;
      }
      //FileReaderのreadAsDataURLで指定したFileオブジェクトを読み込む
      let fileReader = new FileReader();
      //DataTransferオブジェクトに対して、fileを追加
      dataBox.items.add(file)
      let num = $('.item-image').length + 1 + i
      fileReader.readAsDataURL(file);
       //画像が5枚になったら超えたらドロップボックスを削除する
      if (num == 5){
        
        $('.box__file__field').css('display', 'none')   
      }

      //読み込みが完了すると、srcにfileのURLを格納
      fileReader.onloadend = function() {
        let src = fileReader.result
        let html= `<div class='item-image' data-image="${file.name}">
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
        console.log(html)
        $('.box__file__img').before(html);
  
        
      };
      //image-box__containerのクラスを変更し、CSSでドロップボックスの大きさを変える。
      $('#image-box__container').attr('class', `item-num-${num}`)
  
    });
  });
  let dataBox = new DataTransfer();
//querySelectorでfile_fieldを取得
let file_field = document.querySelector('input[type=file]')


//削除ボタンをクリックすると発火するイベント
$(document).on("click", '.item-image__operation--delete', function(){
  //プレビュー要素を取得
  let target_image = $(this).parent().parent()
  const index = $(this).parent().parent().data("index")
  $(`#item_item_images_attributes_${index}__destroy`).prop('checked', true);
  //プレビューを削除
  target_image.remove();

})
})
);


