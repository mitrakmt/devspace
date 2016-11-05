let login = function () {
  $.ajax({
    url: '/api/users/login',
    success: function () {
      console.log("Worked")
    }
  })
}
