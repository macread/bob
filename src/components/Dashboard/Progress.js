import React from 'react';
import {Doughnut} from 'react-chartjs-2';



export default function Progress(props){
  
  const data = {
    labels: [
          'Completed',
          'To Go'
    ],
    datasets: [{
      data: [props.progress, props.togo],
      backgroundColor: [
        '#499B49',
        '#FFC64C'
      ],
      hoverBackgroundColor: [
        '#499B49',
        '#FFC64C'
      ]
    }]
  };



  


  return (
    <div>
      <h2>{props.header}</h2>
      <Doughnut data={data} />
    </div>
  );
};