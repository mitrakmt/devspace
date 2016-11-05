let login = function () {
  $.ajax({
    url: '/api/users/auth',
    success: function () {
      console.log("Worked")
    }
  })
}
