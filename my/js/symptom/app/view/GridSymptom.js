Ext.define('my.js.symptom.app.view.GridSymptom',  {
    id        : 'grid_symptom',
    extend    : 'Ext.grid.Panel',
    xtype     : 'grid-symptom',
    requires  : [
        'my.js.symptom.app.view.GridSymptomModel'
    ],
    viewModel : { type : 'model-symptom' },
    bind      : {
        store : '{symptoms}',
    },

    columns   : [
      { header : 'Reject Date',
        flex:1
      },
      { header : 'Line Name',
        flex:1
      },
      {
        header : 'Model Name',
        flex:1
      },
      { header : 'Lot Size',
      flex:1
      },
      { header : 'Start Serial',
      flex:1
      },
      { header : 'Defected Cause',
      flex:1
      },
      { header : 'Place Disposal',
      flex:1
      },
      { header : 'Total Reject',
      flex:1
      }
    ]
  });
