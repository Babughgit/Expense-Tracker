$(document).ready(function(){
    var expenses = [];
  
    // Add expense
    $("#expenseForm").submit(function(event){
      event.preventDefault();
      var category = $("#category").val();
      var amount = $("#amount").val();
      if(category && amount){
        expenses.push({ category: category, amount: amount });
        updateExpenseList();
        $("#category").val('');
        $("#amount").val('');
      }
    });
  
    // Update expense list
    function updateExpenseList(){
      $("#expenseList").empty();
      expenses.forEach(function(expense, index){
        var row = $("<tr>");
        var categoryCell = $("<td>");
        var amountCell = $("<td>");
        var actionsCell = $("<td>");
        
        // Edit mode
        var editCategoryInput = $("<input>").attr("type", "text").addClass("form-control").val(expense.category);
        var editAmountInput = $("<input>").attr("type", "number").addClass("form-control").val(expense.amount);
        var saveButton = $("<button>").addClass("btn btn-primary btn-sm mr-2").text("Save").click(function(){
          expenses[index].category = editCategoryInput.val();
          expenses[index].amount = editAmountInput.val();
          updateExpenseList();
        });
        var cancelButton = $("<button>").addClass("btn btn-secondary btn-sm").text("Cancel").click(function(){
          updateExpenseList();
        });
  
        // Display mode
        var displayCategory = $("<span>").text(expense.category);
        var displayAmount = $("<span>").text(expense.amount);
        var editButton = $("<button>").addClass("btn btn-secondary btn-sm").text("Edit").click(function(){
          categoryCell.empty().append(editCategoryInput);
          amountCell.empty().append(editAmountInput);
          actionsCell.empty().append(saveButton).append(cancelButton);
        });
  
        var deleteButton = $("<button>").addClass("btn btn-danger btn-sm").text("Delete").click(function(){
          expenses.splice(index, 1);
          updateExpenseList();
        });
  
        categoryCell.append(displayCategory);
        amountCell.append(displayAmount);
        actionsCell.append(editButton).append(deleteButton);
        
        row.append(categoryCell).append(amountCell).append(actionsCell);
        $("#expenseList").append(row);
      });
    }
  
    // Initial expense list rendering
    updateExpenseList();
  });
  