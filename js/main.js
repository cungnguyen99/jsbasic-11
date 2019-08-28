'use strict';
document.addEventListener('DOMContentLoaded', function() {
    validation.init([
      {
        selector: '.name',
        name: 'name',
        type: 'text',
        min: 1,
        max: 32 
      },
      {
        selector: '.age',
        name: 'age',
        type: 'number'
      },
      {
        selector: '.phone',
        name: 'phone',
        type: 'number'
      },
      {
        selector: '.address',
        name: 'address',
        type: 'text',
        min: 1,
        max: 255
      },
      {
        selector: '.email',
        name: 'email',
        type: 'email'
      }
    ]);
  });
const Student={
  storage: 'listStudent',
  //Lúc đầu để data là 1 arr trống
  data:[],
  load: function(){
    const jsonData=localStorage.getItem(this.storage)
    //gán data rỗng đấy cho data ở trong localstorage
    this.data=JSON.parse(jsonData)
  },
  add: function(student){
    this.data.push(student)
  },
  delete: function(index){
    return this.data.splice(index,1)
  },
  edit: function(index,student){
    this.data[index]=student
  },
  save: function(){
    const jsonData=JSON.stringify(this.data)
    localStorage.setItem(this.storage,jsonData)
  },
  get list(){
    return this.data
  }
}
/**
 * Lúc đầu phải chạy dòng này 1 lần rồi cmt vì phải chạy dòng này nó mới tạo được data trong localstorage
 * rồi khi gọi load ra nó mới có cái để gán, sau đó chạy renderStudents thì chỗ listStudent mới có  dữ liệu
 * để in ra giao diện. Sau đó phải cmt lại vì khi load lại nó sẽ chạy lại dòng này và sẽ khởi tạo 1 dãy mới
 * và dữ liệu trong local sẽ mất và phải nhập lại
 */
// Student.save()

//data lúc này sẽ có dữ liệu trong localstorage
Student.load()
renderStudents()

function renderStudents(){
    const listStudent=Student.list
    var content=listStudent.map(function(items,index){
        var html = '';
        html += '<li class="student">'
        html += '<p><span>Name:</span>' + items.name + '</p>'
        html += '<p><span>Age:</span>' + items.age + '</p>'
        html += '<p><span>Phone:</span> ' + items.phone + '</p>'
        html += '<p><span>Email:</span> ' + items.email + '</p>'
        html += '<p><span>Addess:</span> ' + items.address + '</p>'
        html += '<i class="student-delete" onclick="onDeleteStudent(' + index + ')">X</i>'
        html += '<i class="student-edit" onclick="onEditStudent(' + index + ')">Edit</i>'
        html += '</li>'
        return html;
    });
    setHTML('#students-list',content);
}

function submitClickHandle(){
  getStudentInfoFromInputs()
  renderStudents()
}

function onDeleteStudent(index){
  Student.delete(index)
  Student.save()
  renderStudents()
}

function onEditStudent(index) {

  // setInputValue('.student-form .name', Student.data[index].name);
  // setInputValue('.student-form .age', Student.data[index].age);
  // setInputValue('.student-form .phone', Student.data[index].phone);
  // setInputValue('.student-form .email', Student.data[index].email);
  // setInputValue('.student-form .address', Student.data[index].address);

  Student.edit(index) 

  validation.checkAllError();

  setHTML('.createStudent', 'Save');
}

function getStudentInfoFromInputs() {
  var name = getInputValue('.student-form .name')
  var age = getInputValue('.student-form .age')
  var phone = getInputValue('.student-form .phone')
  var email = getInputValue('.student-form .email')
  var address = getInputValue('.student-form .address')
  Student.add({
    name: name,
    age: age,
    phone: phone,
    email: email,
    address: address
  })
  Student.save()
  studentFormReset()
  renderStudents()
}

function getInputValue(selector) {
  var inputElement = document.querySelector(selector)
  return inputElement.value
}

function studentFormReset() {
  setInputValue('.student-form .name', '');
  setInputValue('.student-form .age', '');
  setInputValue('.student-form .phone', '');
  setInputValue('.student-form .email', '');
  setInputValue('.student-form .address', '');
}

function setInputValue(selector, value) {
  var element = document.querySelector(selector);
  element.value = value;
}

function setHTML(selector, html) {
    var element = document.querySelector(selector);
    element.innerHTML = html;
}
