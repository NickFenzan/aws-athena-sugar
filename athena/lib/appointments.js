const FREE_EVALUATION_TYPE_IDS = [];
const NEW_PATIENT_TYPE_IDS = [2];
const PROCEDURE_TYPE_IDS = [3];

let Appointments = function(api) {
  this.changed = {
    results: (leaveUnprocessed = 'true') =>
      api.GET('/appointments/changed', {"params":{"leaveunprocessed":leaveUnprocessed}}),
    subscription: {
      get: () => api.GET('/appointments/changed/subscription'),
      create: () => api.POST('/appointments/changed/subscription'),
      delete: () => api.DELETE('/appointments/changed/subscription')
    }
  }

  /**
  * This takes an array of appointments from Athena and converts it to a
  * simplified representation containing the status of key appointment types.
  */
  this.simplifyAppointmentSet = (appointmentSet) => {
    let simplified = {
      free: {
        noShow: false,
        validScheduled: false
      },
      newPatient: {
        noShow: false,
        validScheduled: false
      },
      procedure: {
        noShow: false,
        validScheduled: false
      },
      lastAppointmentDate: null
    };
    for(let i = 0; i < appointmentSet.length; i++){
      let appointment = appointmentSet[i];
      console.log(appointment);
    }
    return simplified;
  }
}

exports.module = Appointments;
