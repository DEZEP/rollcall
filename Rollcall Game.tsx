import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DiceFace = ({ value, isStatic }) => {
  if (isStatic) {
    return (
      <div className="dice-face static-face">
        <span className="dice-number">{value}</span>
      </div>
    );
  }

  return (
    <div className="dice-face">
      <span className="dice-number">{value}</span>
    </div>
  );
};

const Dice = ({ value, rolling }) => {
  return (
    <div className="scene">
      <div className={`cube ${rolling ? 'rolling' : ''}`}>
        <DiceFace value={1} isStatic={!rolling && value === 1} />
        <DiceFace value={6} isStatic={!rolling && value === 6} />
        <DiceFace value={2} isStatic={!rolling && value === 2} />
        <DiceFace value={5} isStatic={!rolling && value === 5} />
        <DiceFace value={3} isStatic={!rolling && value === 3} />
        <DiceFace value={4} isStatic={!rolling && value === 4} />
      </div>
    </div>
  );
};

const RollCall = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState('');
  const [rolledNumber, setRolledNumber] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [assignedTask, setAssignedTask] = useState('');

  const addTask = () => {
    if (currentTask.trim() !== '') {
      setTasks([...tasks, currentTask.trim()]);
      setCurrentTask('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const rollDice = () => {
    setIsRolling(true);
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      setRolledNumber(Math.floor(Math.random() * 6) + 1);
      rollCount++;
      if (rollCount >= 20) {
        clearInterval(rollInterval);
        setIsRolling(false);
        const finalRoll = Math.floor(Math.random() * tasks.length);
        setRolledNumber((finalRoll % 6) + 1);
        setAssignedTask(tasks[finalRoll]);
      }
    }, 100);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <style jsx global>{`
        .scene {
          width: 100px;
          height: 100px;
          margin: 0 auto;
          perspective: 400px;
        }
        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transform: translateZ(-50px);
          transition: transform 1s;
        }
        .rolling {
          animation: rotate 1.5s infinite linear;
        }
        @keyframes rotate {
          0% { transform: translateZ(-50px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: translateZ(-50px) rotateX(360deg) rotateY(720deg) rotateZ(360deg); }
        }
        .dice-face {
          position: absolute;
          width: 100px;
          height: 100px;
          border: 2px solid #000;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: white;
          font-size: 24px;
          font-weight: bold;
        }
        .static-face {
          background: #3b82f6;
          color: white;
        }
        .dice-number {
          font-size: 48px;
          font-weight: bold;
        }
        .cube .dice-face:nth-child(1) { transform: rotateY(0deg) translateZ(50px); }
        .cube .dice-face:nth-child(2) { transform: rotateY(180deg) translateZ(50px); }
        .cube .dice-face:nth-child(3) { transform: rotateY(-90deg) translateZ(50px); }
        .cube .dice-face:nth-child(4) { transform: rotateY(90deg) translateZ(50px); }
        .cube .dice-face:nth-child(5) { transform: rotateX(-90deg) translateZ(50px); }
        .cube .dice-face:nth-child(6) { transform: rotateX(90deg) translateZ(50px); }
      `}</style>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>RollCall</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <Input
              type="text"
              value={currentTask}
              onChange={(e) => setCurrentTask(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter a task"
              className="mr-2"
            />
            <Button onClick={addTask}>Add Task</Button>
          </div>
          <ul className="list-disc pl-5 mb-4">
            {tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
          <Button onClick={rollDice} disabled={isRolling || tasks.length === 0} className="w-full mb-4">
            {isRolling ? 'Rolling...' : 'Roll Dice'}
          </Button>
          <div className="flex justify-center mb-4">
            <Dice value={rolledNumber} rolling={isRolling} />
          </div>
          {assignedTask && (
            <p className="mt-4 text-center font-bold">Your task: {assignedTask}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RollCall;
