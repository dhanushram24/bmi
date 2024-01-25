"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import ChartContainer from '../ChartContainer/chartcontainer';
import styles from './calculator.module.css';


export default function Calculator() {
  const [selectedGender, setSelectedGender] = useState('');
  const [feet, setFeet] = useState('');
  const [heightInInches, setHeightInInches] = useState('');
  const [heightInCm, setHeightInCm] = useState('');
  const [isInches, setIsInches] = useState(true);
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState('----');

const handleButtonClick = (gender) => {
    setSelectedGender(gender);
  };

const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleFeetChange = (event) => {
    setFeet(event.target.value);
  };

  const handleInchesChange = (event) => {
    setHeightInInches(event.target.value);
  };
  

  const handleHeightChange = (event) => {
    setHeightInCm(event.target.value);
  };

  const handleUnitSwitch = () => {
    setFeet(''); 
    setHeightInInches(''); 
    setIsInches(!isInches);
	  setBmiResult('----'); 
  };

    const handleCalculate = () => {
      let heightInMeters;
  
      if (isInches) {
        const totalInches = (parseInt(feet, 10) * 12) + parseInt(heightInInches, 10);
        heightInMeters = totalInches * 0.0254;
      } else {
        heightInMeters = parseFloat(heightInCm) * 0.01;
      }

      const bmi = parseFloat(weight) / (heightInMeters * heightInMeters);
      
      setBmiResult(bmi.toFixed(2));
    };
  

  return (
    <main className={styles.bmii}>
      <div>
        <div className={styles.myHeader}>
          <Image className={styles.myLogo} src="/bmi.png" alt="" width={100} height={50} />
          <div className={styles.myHeaderContent}>
            <h1 className={styles.myTitle}>BMI Calculator</h1>
            <h2 className={styles.mySubtitle}>Body Mass Index</h2>
          </div>
        </div>
        
        <div className={styles.myTwoColumnGrid}>
          <div className={styles.myFormGroup}>
            <label className={styles.myLabel}>Gender:</label>
            <div>
              <button
        onClick={() => handleButtonClick('male')}
        style={{
          color: 'rgb(51, 51, 51)',
          padding: '8px 45px',
          borderRadius: '8px',
          border: '1px solid rgb(51, 51, 51)',
          backgroundColor: selectedGender === 'male' ? 'orange' : '',
        }}
      >
        Male
      </button>
      
      <button
        onClick={() => handleButtonClick('female')}
        style={{
          color: 'rgb(51, 51, 51)',
          padding: '8px 45px',
          borderRadius: '8px',
          border: '1px solid rgb(51, 51, 51)',
          backgroundColor: selectedGender === 'female' ? 'orange' : '',
        }}
      >
        Female
      </button>
            </div>
          </div>

          <div className={styles.myFormGroup}>
            <label className={styles.myLabel}>AGE:</label>
            <input
              type="number"
              value={age}
              onChange={handleAgeChange}
              placeholder="                                                            years"
              className={styles.myInput}
            />
            <p className={styles.myNote}>(Between 2 yrs and 120 yrs)</p>
          </div>
        </div>

        
        <div className={styles.myFormContainer}>
            {isInches ? (
              <div className={styles.myFormSection}>
                <div className={styles.myInputContainer}>
                  <label className={styles.myInputLabel}>HEIGHT:</label>
                  <div className={styles.myInputWrapper}>
                    <input
                      type="number"
                      value={feet}
                      onChange={handleFeetChange}
                      placeholder="FT"
                      className={styles.myInputFeet}
                    />
                    <input
                      type="number"
                      value={heightInInches}
                      onChange={handleInchesChange}
                      placeholder="IN"
                      className={styles.myInputInches}
                    />
                  </div>
                </div>
                <div className={styles.myUnitSwitch}>
                  <p className={styles.mySwitchText} onClick={handleUnitSwitch}>
                    Switch to cm
                  </p>
                </div>
              </div>
            ) : (
              <div className={styles.myFormSection}>
                <div className={styles.myInputContainer}>
                  <label className={styles.myInputLabel}>HEIGHT:</label>
                  <div className={styles.myInputWrapper}>
                    <input
                      type="number"
                      value={heightInCm}
                      onChange={handleHeightChange}
                      placeholder="CM"
                      className={styles.myInputCm}
                    />
                  </div>
                </div>
                <div className={styles.myUnitSwitch}>
                  <p className={styles.mySwitchText} onClick={handleUnitSwitch}>
                    Switch to inches
                  </p>
                </div>
              </div>
            )}
          

          <div className={styles.myWeightContainer}>
            <div className={styles.myWeightInput}>
              <label className={styles.myWeightLabel}>WEIGHT:</label>
              <input
                type="number"
                value={weight}
                onChange={handleWeightChange}
                placeholder="in Kgs"
                className={styles.myWeightField}
              />
            </div>
          </div>
        </div>
        <div className={styles.myButtonContainer}>
          <button onClick={handleCalculate} className={styles.myCalculateButton}>
            Calculate
          </button>
        </div>
      </div>
      
      <div>
        <ChartContainer bmiResult={bmiResult} />
      </div>
    </main>
    
  );
}