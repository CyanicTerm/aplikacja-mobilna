import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const CalculatorApp = () => {
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState('');

  const handleButtonPress = (value) => {
    if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      clearResult();
    } else {
      setResult((prevResult) => prevResult + value);
    }
  };

  const calculateResult = () => {
    try {
      const calculatedResult = eval(result);
      const historyItem = result + ' = ' + calculatedResult;
      if (editIndex >= 0) {
        setHistory((prevHistory) => {
          const updatedHistory = [...prevHistory];
          updatedHistory[editIndex] = historyItem;
          return updatedHistory;
        });
        setEditIndex(-1);
        setEditValue('');
      } else {
        setHistory((prevHistory) => [...prevHistory, historyItem]);
      }
      setResult(calculatedResult.toString());
    } catch (error) {
      setResult('Error');
    }
  };
  const deleteHistoryItem = (index) => {
    setHistory((prevHistory) => {
      const updatedHistory = [...prevHistory];
      updatedHistory.splice(index, 1);
      return updatedHistory;
    });
  };
  const editHistoryItem = (index) => {
    const historyItem = history[index];
    const parts = historyItem.split('=');
    const expression = parts[0].trim();
    setResult(expression);
    setEditIndex(index);
    setEditValue(expression);
  };

  const clearResult = () => {
    setResult(a => a.slice(0, -1));
    setEditIndex(-1);
    setEditValue('');
  };

  const renderHistoryItem = (item, index) => {
    return (
      // <View style={styles.buttonsContainer}>
      <View style={styles.row}>
      <View key={index} style={styles.historyItem}>
        <Text style={styles.historyText}>{item}</Text>
        <TouchableOpacity
          style={styles.buttonsCrudText}
          onPress={() => editHistoryItem(index)}
        >
          <Text style={styles.buttonsToCrud}>Edytuj</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonsCrudText}
          onPress={() => deleteHistoryItem(index)}
        >
          <Text style={styles.buttonsToCrud}>Usuń</Text>
        </TouchableOpacity>
      </View>
      </View>
      // </View>
    );
  };

  return (
    <View style={styles.container}>
        <View style={styles.resultContainer}>
        <TextInput
          style={styles.resultText}
          value={result}
          editable={false}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('7')}
          >
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('8')}
          >
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('9')}
          >
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('/')}
          >
            <Text style={styles.buttonText}>/</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('4')}
          >
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('5')}
          >
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('6')}
          >
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('*')}
          >
            <Text style={styles.buttonText}>*</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('1')}
          >
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('2')}
          >
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('3')}
          >
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('-')}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>          
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('0')}
          >
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>          
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('.')}
          >
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('C')}
          >
            <Text style={styles.buttonText}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('+')}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
            style={styles.equalsButton}
            onPress={() => handleButtonPress('=')}
          >
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.container}>
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Historia</Text>
        {history.map(renderHistoryItem)}
        <TouchableOpacity style={styles.clearHistoryButton} onPress={() => setHistory([])}>
          <Text style={styles.clearHistoryButtonText}>Wyczyść historię</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  resultContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    marginTop:50
  },
  resultText: {
    fontSize: 24,
    textAlign: 'right',
  },
  buttonsContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 24,
    textAlign: 'center',
  },
  buttonsCrudText: {
    fontSize: 10,
    textAlign: 'center'
  },
  buttonsToCrud: {
    backgroundColor: 'pink',
    borderRadius: 10,
    padding: 1,
    marginTop: 0,
    textAlign: 'center'
  },
  historyContainer: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItem: {
    marginBottom: 5,
  },
  clearHistoryButton: {
    backgroundColor: 'pink',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  clearHistoryButtonText: {
    color: 'black',
    textAlign: 'center',
  },
  equalsButton: {
    backgroundColor: 'pink',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    textAlign: 'center'
  }
});

export default CalculatorApp;
