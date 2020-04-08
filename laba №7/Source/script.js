document.getElementById("subscribeInput").value = getSavedValue("subscribeInput");
    document.getElementById("txt_2").value = getSavedValue("txt_2");

    function saveValue(e) {
      var id = e.id;
      var val = e.value;
      localStorage.setItem(id, val);
    }

    function getSavedValue(v) {
      if (!localStorage.getItem(v)) {
        return "";
      }
      return localStorage.getItem(v);
    }