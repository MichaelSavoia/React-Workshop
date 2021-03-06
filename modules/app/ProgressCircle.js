import React from 'react';

const gray = '#ffffff';
const red = '#f56565';
const accent = '#a3bffa';
const green = '#48bb78';

export default function ProgressCircle({
  radius = 30,
  stroke = 10,
  progress = 120,
  expectedProgress = 100,
  bg = gray
}) {
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const expectedStrokeDashoffset =
    circumference - (expectedProgress / 100) * circumference;
  const deficit = progress < expectedProgress;

  console.log('deficit: ', deficit);

  const progressBar = (
    <circle
      key="progress"
      stroke={deficit ? accent : green}
      fill="transparent"
      strokeWidth={stroke}
      strokeDasharray={circumference + ' ' + circumference}
      style={{
        strokeDashoffset,
        transform: 'rotate(-90deg)',
        transformOrigin: '50% 50%'
      }}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
    />
  );

  const expectedBar = (
    <circle
      key="expected"
      stroke={deficit ? red : accent}
      fill="transparent"
      strokeWidth={stroke}
      strokeDasharray={circumference + ' ' + circumference}
      style={{
        strokeDashoffset: expectedStrokeDashoffset,
        transform: 'rotate(-90deg)',
        transformOrigin: '50% 50%'
      }}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
    />
  );

  return (
    <svg
      aria-label={`Progress: ${progress}%`}
      height={radius * 2}
      width={radius * 2}
    >
      <circle
        stroke={bg}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        style={{
          boxShadow: '1px 1px 1px hsla(0, 0%, 0%, 0.5)',
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%'
        }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      {deficit ? [expectedBar, progressBar] : [progressBar, expectedBar]}
    </svg>
  );
}
