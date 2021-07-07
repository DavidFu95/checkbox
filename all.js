const txt = document.querySelector(".txt");
const save = document.querySelector(".save");
const list = document.querySelector(".list");
const checkStatus = document.querySelector("input");
const notDoneNum = document.querySelector(".notDoneNum");
const filter = document.querySelector(".filter");
const deleteAllDone = document.querySelector(".deleteAllDone");
//創造空集合

let data = [];

//資料初始化
function renderData() {
  let str = "";
  data.forEach(function (item, index) {
    if (item.done == "待完成") {
      str += `<li><label class="obj"><input class="checkBox"    type="checkbox"  data-num=${index}>
    <i class="fas fa-check"></i>
    <p>${item.content}</p></label>
    <input class="deleteObj" data-num=${index} type="image"src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="delete"></li>`;
    } else {
      str += `<li><label class="obj"><input class="checkBox"   checked type="checkbox"  data-num=${index}>
    <i class="fas fa-check"></i>
    <p>${item.content}</p></label>
    <input class="deleteObj" data-num=${index} type="image"src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="delete"></li>`;
    }
  });
  list.innerHTML = str;
}
// renderData();
// calNum();

//新增項目
save.addEventListener("click", function (e) {
  if (txt.value == "") {
    return;
  } else if (txt.value.trim() == "") {
    alert("請輸入待辦事項");
  }
  let obj = { done: "待完成", content: txt.value.trim() };
  data.push(obj);
  txt.value = "";
  renderData();
  calNum();
});

// 改變項目狀態
list.addEventListener("click", function (e) {
  if (
    e.target.nodeName == "LI" ||
    e.target.getAttribute("class") == "deleteObj"
  ) {
    return;
  }
  if (e.target.nodeName == "INPUT") {
    const changeNum = e.target.getAttribute("data-num");
    if (data[changeNum].done == "已完成") {
      data[changeNum].done = "待完成";
    } else if (data[changeNum].done == "待完成") {
      data[changeNum].done = "已完成";
    }
  }
  calNum();
});

// 過濾項目狀態
filter.addEventListener("click", function (e) {
  if (e.target.value == "全部") {
    renderData();
    return;
  } else {
    let str = ``;
    data.forEach(function (item, index) {
      if (e.target.value == item.done && item.done == "待完成") {
        let content = `<li><label class="obj"><input class="checkBox"  type="checkbox" data-num=${index}>
 <i class="fas fa-check"></i>
 <p>${item.content}</p></label>
 <input class="deleteObj" data-num=${index} type="image"src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="delete"></li>`;
        str += content;
      } else if (e.target.value == item.done && item.done == "已完成") {
        let content = `<li><label class="obj"><input class="checkBox"  checked="checked" type="checkbox" data-num=${index}>
 <i class="fas fa-check"></i>
 <p>${item.content}</p></label>
 <input class="deleteObj" data-num=${index} type="image"src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="delete"></li>`;
        str += content;
      }
    });
    list.innerHTML = str;
  }
});

//     let content = `<li><label class="obj"><input class="checkBox"  type="checkbox" data-num=${index}>
// <i class="fas fa-check"></i>
// <p>${item.content}</p></label>
// <input class="deleteObj" data-num=${index} type="image"src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="delete"></li>`;
//     str += content;

// filter.addEventListener("click", function (e) {
//   let str = ``;
//   data.forEach(function (item, index) {
//     if (e.target.value == item.done) {
//       let content = `<li><label class="obj"><input class="checkBox"  type="checkbox" data-num=${index}>
//     <i class="fas fa-check"></i>
//     <p>${item.content}</p></label>

//     <input class="deleteObj" data-num=${index} type="image"src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="delete"></li>`;
//       str += content;
//     } else if (e.target.value == "全部") {
//       let content = `<li><label class="obj"><input class="checkBox"  type="checkbox" data-num=${index}>
//     <i class="fas fa-check"></i>
//     <p>${item.content}</p></label>

//     <input class="deleteObj" data-num=${index} type="image"src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="delete"></li>`;
//       str += content;
//     }
//     const list = document.querySelector(".list");

//     list.innerHTML = str;
//   });
//   calNum();
// });

//刪除個別項目
list.addEventListener("click", function (e) {
  if (e.target.getAttribute("class") !== "deleteObj") {
    return;
  }
  let delNum = e.target.getAttribute("data-num");
  data.splice(delNum, 1);
  renderData();
  calNum();
});

//計算待完成項目
function calNum() {
  let calNum = 0;
  data.forEach(function (item) {
    if (item.done == "待完成") {
      calNum += 1;
    } else if (item.done == "已完成") {
      calNum += 0;
    }
  });
  notDoneNum.textContent = `${calNum}個待完成項目`;
}

//清除已完成項目
deleteAllDone.addEventListener("click", function (e) {
  data.forEach(function (item, index) {
    if (item.done == "已完成") {
      delete data[index];
    }
  });
  renderData();
});
