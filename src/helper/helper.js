export const checkAllMandateFields = (task, newStage, reqFields, fields) => {
    let isValid = true;
    const mandateFieldObject =  reqFields?.mandateFields;
    mandateFieldObject.forEach((field)=>{
      if(!task[field]){
        isValid = false;
        return `"${fields[field]?.label}" should be updated before moving this ticket to "${newStage}" stage`;
      }
    })
    return isValid
  }