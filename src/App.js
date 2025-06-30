import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Plus, Download, FileText, User, Zap, Printer, Copy, Trash2, Settings, X, Menu, MousePointer, Palette, Target, HelpCircle, Stethoscope, BarChart3, Layers, Wrench, ClipboardList, RotateCcw, Activity, Clock, Radiation, ChevronLeft, ChevronRight, Edit, BookOpen } from 'lucide-react';

const DentalTreatmentPlanner = () => {
  const [teethStatus, setTeethStatus] = useState({});
  const [cancerType, setCancerType] = useState('');
  const [showRadiationMode, setShowRadiationMode] = useState(true);
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [showProcedureModal, setShowProcedureModal] = useState(false);
  const [showSurfaceModal, setShowSurfaceModal] = useState(false);
  const [activeTab, setActiveTab] = useState('planning');
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [appointmentTeeth, setAppointmentTeeth] = useState([]);
  const [appointmentNotes, setAppointmentNotes] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [patientInfo, setPatientInfo] = useState({
    name: 'นาย Dental Patient',
    age: '99',
    gender: 'Male',
    hn: 'HN001234',
    phone: '081-234-5678',
    allergies: 'Penicillin',
    lastVisit: '2025-06-15'
  });
  const [selectedSurfaces, setSelectedSurfaces] = useState([]);
  const [selectedProcedure, setSelectedProcedure] = useState('');
  const [procedureNotes, setProcedureNotes] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [radiationDate, setRadiationDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('09:30');

  const imertRadiationData = {
    'ca_nasopharynx': [18, 28],
    'right_sinunasal_ca': [18,17,16,15,14,13,12,11,21,22,23],
    'left_sinunasal_ca': [13,12,11,21,22,23,24,25,26,27,28],
    'ca_hypopharynx_larynx': [48,38],
    'right_ca_base_tongue': [18,17,48,47],
    'midline_ca_base_tongue': [48,47,46,36,37,38],
    'left_ca_base_tongue': [27,28,37,38],
    'right_ca_tonsil': [18,17,48,47],
    'left_ca_tonsil': [27,28,37,38],
    'right_ca_soft_palate': [18,17,16,48,47,46],
    'midline_ca_soft_palate': [18,17,16,26,27,28,48,47,46,36,37,38],
    'left_ca_soft_palate': [48,47,46,36,37,38],
    'ca_tongue': [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38],
    'ca_floor_mouth': [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38],
    'midline_ca_palate': [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28],
    'q1_ca_gum': [18,17,16,15,14,13,12,11,21,22],
    'q2_ca_gum': [12,11,21,22,23,24,25,26,27,28],
    'q3_ca_gum': [42,41,31,32,33,34,35,36,37,38],
    'q4_ca_gum': [48,47,46,45,44,43,42,41,31,32],
    'right_ca_buccal': [18,17,16,15,14,13,12,11,48,47,46,45,44,43,42,41],
    'left_ca_buccal': [21,22,23,24,25,26,27,28,31,32,33,34,35,36,37,38],
    'right_ca_retromolar': [18,17,16,15,14,48,47,46,45,44],
    'left_ca_retromolar': [24,25,26,27,28,34,35,36,37,38],
    'rt_neck_submand': [48,47,46,45,44],
    'lt_neck_submand': [34,35,36,37,38]
  };

  const cancerTypes = [
    { value: 'ca_nasopharynx', label: 'CA Nasopharynx', thai: 'มะเร็งโพรงจมูกส่วนหลัง' },
    { value: 'right_sinunasal_ca', label: 'Right Sinunasal CA (mouth tube)', thai: 'มะเร็งไซนัสขวา' },
    { value: 'left_sinunasal_ca', label: 'Left Sinunasal CA (mouth tube)', thai: 'มะเร็งไซนัสซ้าย' },
    { value: 'ca_hypopharynx_larynx', label: 'CA hypopharynx / Larynx', thai: 'มะเร็งคอหอยส่วนล่าง/กล่องเสียง' },
    { value: 'right_ca_base_tongue', label: 'Right CA base of tongue (mouth tube)', thai: 'มะเร็งโคนลิ้นขวา' },
    { value: 'midline_ca_base_tongue', label: 'Midline CA base of tongue (mouth tube)', thai: 'มะเร็งโคนลิ้นกลาง' },
    { value: 'left_ca_base_tongue', label: 'Left CA base of tongue (mouth tube)', thai: 'มะเร็งโคนลิ้นซ้าย' },
    { value: 'right_ca_tonsil', label: 'Right CA tonsil (mouth tube)', thai: 'มะเร็งต่อมทอนซิลขวา' },
    { value: 'left_ca_tonsil', label: 'Left CA tonsil (mouth tube)', thai: 'มะเร็งต่อมทอนซิลซ้าย' },
    { value: 'right_ca_soft_palate', label: 'Right CA soft palate', thai: 'มะเร็งเพดานอ่อนขวา' },
    { value: 'midline_ca_soft_palate', label: 'Midline CA soft palate', thai: 'มะเร็งเพดานอ่อนกลาง' },
    { value: 'left_ca_soft_palate', label: 'Left CA soft palate', thai: 'มะเร็งเพดานอ่อนซ้าย' },
    { value: 'ca_tongue', label: 'CA tongue (mouth tube)', thai: 'มะเร็งลิ้น' },
    { value: 'ca_floor_mouth', label: 'CA floor of mouth (mouth tube)', thai: 'มะเร็งพื้นปาก' },
    { value: 'midline_ca_palate', label: 'Midline CA palate (mouth tube)', thai: 'มะเร็งเพดานกลาง' },
    { value: 'q1_ca_gum', label: 'Q1 CA gum, alveolar ridge', thai: 'มะเร็งเหงือกและสันเหงือก Q1' },
    { value: 'q2_ca_gum', label: 'Q2 CA gum, alveolar ridge', thai: 'มะเร็งเหงือกและสันเหงือก Q2' },
    { value: 'q3_ca_gum', label: 'Q3 CA gum, alveolar ridge', thai: 'มะเร็งเหงือกและสันเหงือก Q3' },
    { value: 'q4_ca_gum', label: 'Q4 CA gum, alveolar ridge', thai: 'มะเร็งเหงือกและสันเหงือก Q4' },
    { value: 'right_ca_buccal', label: 'Right CA Buccal oral mucosa', thai: 'มะเร็งเยื่อบุช่องปากด้านแก้มขวา' },
    { value: 'left_ca_buccal', label: 'Left CA Buccal oral mucosa', thai: 'มะเร็งเยื่อบุช่องปากด้านแก้มซ้าย' },
    { value: 'right_ca_retromolar', label: 'Right CA retromolar', thai: 'มะเร็งเหงือกหลังฟันกรามขวา' },
    { value: 'left_ca_retromolar', label: 'Left CA retromolar', thai: 'มะเร็งเหงือกหลังฟันกรามซ้าย' },
    { value: 'rt_neck_submand', label: 'Rt. Neck level Ib (submand area), Node +', thai: 'ต่อมน้ำเหลืองใต้ขากรรไกรขวา' },
    { value: 'lt_neck_submand', label: 'Lt. Neck level Ib (submand area), Node +', thai: 'ต่อมน้ำเหลืองใต้ขากรรไกรซ้าย' }
  ];

  const procedures = [
    { value: 'filling', label: 'Filling', thai: 'อุด', color: 'bg-orange-100 border-orange-500 text-orange-800', requiresSurfaces: true },
    { value: 'crown', label: 'Crown', thai: 'ครอบฟัน', color: 'bg-purple-100 border-purple-500 text-purple-800' },
    { value: 'root_canal', label: 'Root Canal', thai: 'รักษารากฟัน', color: 'bg-pink-100 border-pink-500 text-pink-800' },
    { value: 'implant', label: 'Implant', thai: 'รากเทียม', color: 'bg-gray-100 border-gray-500 text-gray-800' },
    { value: 'surgical', label: 'Surgical Extraction', thai: 'ผ่าฟันคุด', color: 'bg-cyan-100 border-cyan-500 text-cyan-800', restrictedTeeth: [18, 28, 38, 48] },
    { value: 'extract', label: 'Extraction', thai: 'ถอน', color: 'bg-red-100 border-red-500 text-red-800' },
    { value: 'root_planing', label: 'Root Planing', thai: 'เกลารากฟัน', color: 'bg-teal-100 border-teal-500 text-teal-800' },
    { value: 'scaling', label: 'Dental Scaling', thai: 'ขูดหินปูน', color: 'bg-lime-100 border-lime-500 text-lime-800', isFullArch: true },
    { value: 'other', label: 'Other (Specify)', thai: 'อื่นๆ (ระบุ)', color: 'bg-gray-100 border-gray-500 text-gray-800' }
  ];

  const tabs = [
    { id: 'planning', label: 'Treatment Planning', icon: Layers, color: 'blue' },
    { id: 'scheduling', label: 'Scheduling & Appointments', icon: Calendar, color: 'purple' },
    { id: 'export', label: 'Review & Export', icon: Download, color: 'green' },
    { id: 'instructions', label: 'Instructions', icon: BookOpen, color: 'indigo' }
  ];

  const teethLayout = {
    upper: [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28],
    lower: [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38]
  };

  const statusColors = {
    healthy: 'bg-white border-gray-300 text-gray-600',
    consider: 'bg-yellow-400 border-yellow-500 text-white',
    extract: 'bg-red-400 border-red-500 text-white',
    filling: 'bg-orange-400 border-orange-500 text-white',
    crown: 'bg-purple-400 border-purple-500 text-white',
    root_canal: 'bg-pink-400 border-pink-500 text-white',
    surgical: 'bg-cyan-400 border-cyan-500 text-white',
    implant: 'bg-gray-400 border-gray-500 text-white',
    root_planing: 'bg-teal-400 border-teal-500 text-white',
    scaling: 'bg-lime-400 border-lime-500 text-white',
    other: 'bg-gray-400 border-gray-500 text-white'
  };

  const statusLabels = {
    healthy: 'Healthy',
    consider: 'Consider (พิจารณา)',
    extract: 'Extract (ถอน)',
    filling: 'Filling (อุด)',
    crown: 'Crown (ครอบ)',
    root_canal: 'Root Canal (รักษาราก)',
    surgical: 'Surgical (ผ่าฟันคุด)',
    implant: 'Implant (รากเทียม)',
    root_planing: 'Root Planing (เกลาราก)',
    scaling: 'Scaling (ขูดหินปูน)',
    other: 'Other (O)'
  };

  const surfaceAbbreviations = {
    palatal: 'P',
    lingual: 'Li',
    distal: 'D',
    buccal: 'B',
    labial: 'La',
    mesial: 'M',
    occlusal: 'O',
    incisal: 'I'
  };

  const surfaceColors = {
    palatal: 'bg-blue-400',
    lingual: 'bg-blue-400',
    distal: 'bg-orange-400',
    buccal: 'bg-green-400',
    labial: 'bg-green-400',
    mesial: 'bg-pink-400',
    occlusal: 'bg-yellow-400',
    incisal: 'bg-purple-400'
  };

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (appointments.length === 0 && !selectedDate) {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      setSelectedDate(nextWeek.toISOString().split('T')[0]);
    } else if (appointments.length > 0 && !selectedDate) {
      const lastAppointment = appointments[appointments.length - 1];
      const lastDate = new Date(lastAppointment.date);
      const nextDate = new Date(lastDate);
      nextDate.setDate(lastDate.getDate() + 7);
      setSelectedDate(nextDate.toISOString().split('T')[0]);
    }
  }, [appointments.length, selectedDate]);

  useEffect(() => {
    if (cancerType && showRadiationMode) {
      const radiationTeeth = imertRadiationData[cancerType] || [];
      const newStatus = { ...teethStatus };
      
      Object.keys(newStatus).forEach(tooth => {
        if (newStatus[tooth]?.status === 'extract') {
          newStatus[tooth] = { status: 'healthy' };
        }
      });
      
      radiationTeeth.forEach(tooth => {
        newStatus[tooth] = { status: 'extract' };
      });
      
      setTeethStatus(newStatus);
    }
  }, [cancerType, showRadiationMode]);

  const getCircularPosition = (toothNumber, containerWidth, containerHeight) => {
    const fixedSize = 400;
    const centerX = fixedSize / 2;
    const centerY = fixedSize / 2;
    
    const toothRadius = fixedSize * 0.28;
    const labelRadius = fixedSize * 0.42;
    const verticalOffset = fixedSize * 0.06;
    
    // ฟันพิเศษที่ต้องขยับ
    const specialTeeth = {
      moveDown: [18, 28],    // ฟันบนขยับลง
      moveUp: [38, 48]       // ฟันล่างขยับขึ้น
    };
    const extraVerticalOffset = fixedSize * 0.007;
    
    const upperTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
    const lowerTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];
    
    let angle, toothX, toothY, labelX, labelY;
    
    if (upperTeeth.includes(toothNumber)) {
      const index = upperTeeth.indexOf(toothNumber);
      angle = Math.PI - (index * Math.PI) / (upperTeeth.length - 1);
      
      // คำนวณ offset พิเศษ
      let additionalOffset = 0;
      if (specialTeeth.moveDown.includes(toothNumber)) {
        additionalOffset = extraVerticalOffset; // ขยับลง
      }
      
      toothX = centerX + toothRadius * Math.cos(angle);
      toothY = centerY - Math.abs(toothRadius * Math.sin(angle)) - verticalOffset + additionalOffset;
      
      labelX = centerX + labelRadius * Math.cos(angle);
      labelY = centerY - Math.abs(labelRadius * Math.sin(angle)) - verticalOffset + additionalOffset;
      
    } else if (lowerTeeth.includes(toothNumber)) {
      const index = lowerTeeth.indexOf(toothNumber);
      angle = Math.PI - (index * Math.PI) / (lowerTeeth.length - 1);
      
      // คำนวณ offset พิเศษ
      let additionalOffset = 0;
      if (specialTeeth.moveUp.includes(toothNumber)) {
        additionalOffset = -extraVerticalOffset; // ขยับขึ้น
      }
      
      toothX = centerX + toothRadius * Math.cos(angle);
      toothY = centerY + Math.abs(toothRadius * Math.sin(angle)) + verticalOffset + additionalOffset;
      
      labelX = centerX + labelRadius * Math.cos(angle);
      labelY = centerY + Math.abs(labelRadius * Math.sin(angle)) + verticalOffset + additionalOffset;
    }
    
    const margin = 15;
    toothX = Math.max(margin, Math.min(fixedSize - margin, toothX));
    toothY = Math.max(margin, Math.min(fixedSize - margin, toothY));
    labelX = Math.max(margin, Math.min(fixedSize - margin, labelX));
    labelY = Math.max(margin, Math.min(fixedSize - margin, labelY));
    
    return {
      tooth: {
        x: toothX,
        y: toothY,
        left: `${(toothX / fixedSize) * 100}%`,
        top: `${(toothY / fixedSize) * 100}%`
      },
      label: {
        x: labelX,
        y: labelY,
        left: `${(labelX / fixedSize) * 100}%`,
        top: `${(labelY / fixedSize) * 100}%`
      },
      angle: angle
    };
  };

  const cycleThroughStatuses = (toothNumber) => {
    const current = teethStatus[toothNumber]?.status || 'healthy';
    const isRadiationAffected = showRadiationMode && cancerType && 
                               imertRadiationData[cancerType]?.includes(toothNumber);
    
    let nextStatus;
    if (showRadiationMode && isRadiationAffected) {
      const radiationCycle = ['extract', 'consider', 'filling', 'crown', 'root_canal', 'surgical', 'implant', 'root_planing'];
      const currentIndex = radiationCycle.indexOf(current);
      nextStatus = radiationCycle[(currentIndex + 1) % radiationCycle.length];
    } else {
      const normalCycle = ['healthy', 'consider', 'extract', 'filling', 'crown', 'root_canal', 'surgical', 'implant', 'root_planing'];
      const currentIndex = normalCycle.indexOf(current);
      nextStatus = normalCycle[(currentIndex + 1) % normalCycle.length];
    }
    
    if (nextStatus === 'surgical') {
      const restrictedTeeth = [18, 28, 38, 48];
      if (!restrictedTeeth.includes(toothNumber)) {
        const radiationCycle = ['extract', 'consider', 'filling', 'crown', 'root_canal', 'implant', 'root_planing'];
        const normalCycle = ['healthy', 'consider', 'extract', 'filling', 'crown', 'root_canal', 'implant', 'root_planing'];
        const cycle = showRadiationMode && isRadiationAffected ? radiationCycle : normalCycle;
        const surgicalIndex = cycle.indexOf('surgical');
        if (surgicalIndex !== -1) {
          const nextIndex = (surgicalIndex + 1) % cycle.length;
          nextStatus = cycle[nextIndex];
        } else {
          nextStatus = showRadiationMode && isRadiationAffected ? 'implant' : 'implant';
        }
      }
    }
    
    if (nextStatus === 'filling') {
      setSelectedTooth(toothNumber);
      setSelectedProcedure('filling');
      setSelectedSurfaces(teethStatus[toothNumber]?.surfaces || []);
      setProcedureNotes('');
      setShowProcedureModal(true);
      return;
    }
    
    const newSurfaces = nextStatus === 'filling' ? (teethStatus[toothNumber]?.surfaces || []) : [];
    
    setTeethStatus(prev => ({
      ...prev,
      [toothNumber]: { 
        status: nextStatus,
        surfaces: newSurfaces
      }
    }));
  };

  const handleToothClick = (toothNumber) => {
    if (activeTab === 'planning') {
      cycleThroughStatuses(toothNumber);
    } else if (activeTab === 'scheduling') {
      const currentTooth = teethStatus[toothNumber];
      if (currentTooth && currentTooth.status !== 'healthy') {
        setAppointmentTeeth(prev => 
          prev.includes(toothNumber) ? 
            prev.filter(t => t !== toothNumber) : 
            [...prev, toothNumber]
        );
      }
    }
  };

  const getToothShape = (toothNumber) => {
    const isIncisor = [11, 12, 21, 22, 31, 32, 41, 42].includes(toothNumber);
    const isCanine = [13, 23, 33, 43].includes(toothNumber);
    const isPremolar = [14, 15, 24, 25, 34, 35, 44, 45].includes(toothNumber);
    const isMolar = [16, 17, 18, 26, 27, 28, 36, 37, 38, 46, 47, 48].includes(toothNumber);
    
    if (isIncisor) {
      return {
        className: 'rounded-md',
        size: isMobile ? 'w-5 h-8' : 'w-7 h-10',
        icon: '🦷',
        grooves: 'incisor'
      };
    } else if (isCanine) {
      return {
        className: 'rounded-lg transform rotate-12',
        size: isMobile ? 'w-5 h-8' : 'w-7 h-11',
        icon: '🔸',
        grooves: 'canine'
      };
    } else if (isPremolar) {
      return {
        className: 'rounded-lg',
        size: isMobile ? 'w-6 h-6' : 'w-8 h-8',
        icon: '⬛',
        grooves: 'premolar'
      };
    } else if (isMolar) {
      return {
        className: 'rounded-md',
        size: isMobile ? 'w-7 h-6' : 'w-10 h-8',
        icon: '⬜',
        grooves: 'molar'
      };
    }
    
    return {
      className: 'rounded-lg',
      size: isMobile ? 'w-6 h-6' : 'w-8 h-8',
      icon: '🦷',
      grooves: 'default'
    };
  };

  const renderToothGrooves = (grooveType, status) => {
    if (status !== 'healthy') return [];
    const grooveElements = [];
    
    if (grooveType === 'incisor') {
      grooveElements.push(
        <div
          key="incisor-groove"
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-0.5 h-1/2 bg-gray-300 opacity-60"
        />
      );
    } else if (grooveType === 'canine') {
      grooveElements.push(
        <div
          key="canine-groove"
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-0.5 h-3/4 bg-gray-300 opacity-60"
        />
      );
    } else if (grooveType === 'premolar') {
      grooveElements.push(
        <div
          key="premolar-groove-1"
          className="absolute top-1/2 left-1/4 w-1/2 h-0.5 bg-gray-300 opacity-60 transform rotate-45"
        />,
        <div
          key="premolar-groove-2"
          className="absolute top-1/2 left-1/4 w-1/2 h-0.5 bg-gray-300 opacity-60 transform -rotate-45"
        />
      );
    } else if (grooveType === 'molar') {
      grooveElements.push(
        <div
          key="molar-groove-h"
          className="absolute top-1/2 left-1/4 w-1/2 h-0.5 bg-gray-300 opacity-60"
        />,
        <div
          key="molar-groove-v"
          className="absolute top-1/4 left-1/2 w-0.5 h-1/2 bg-gray-300 opacity-60"
        />
      );
    }
    return grooveElements;
  };

  const renderToothSurfaces = (toothNumber, surfaces) => {
    if (!surfaces || surfaces.length === 0) return [];
    
    return surfaces.map((surface, index) => {
      const abbreviation = surfaceAbbreviations[surface] || surface.charAt(0).toUpperCase();
      let positionClass = '';
      
      if (surface === 'palatal' || surface === 'lingual') {
        positionClass = 'absolute bottom-1 left-1/2 transform -translate-x-1/2';
      } else if (surface === 'buccal' || surface === 'labial') {
        positionClass = 'absolute top-1 left-1/2 transform -translate-x-1/2';
      } else if (surface === 'distal') {
        positionClass = 'absolute top-1/2 right-1 transform -translate-y-1/2';
      } else if (surface === 'mesial') {
        positionClass = 'absolute top-1/2 left-1 transform -translate-y-1/2';
      } else if (surface === 'occlusal' || surface === 'incisal') {
        positionClass = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      }
      
      return (
        <div
          key={`surface-${surface}-${index}`}
          className={`${positionClass} text-xs font-bold text-white rounded px-1 ${surfaceColors[surface]} opacity-90 z-20`}
          style={{ fontSize: '8px' }}
          title={surface}
        >
          {abbreviation}
        </div>
      );
    });
  };

  const renderTooth = (toothNumber) => {
    const toothData = teethStatus[toothNumber] || { status: 'healthy' };
    const status = toothData.status;
    const surfaces = toothData.surfaces || [];
    const isRadiationAffected = showRadiationMode && cancerType && 
                               imertRadiationData[cancerType]?.includes(toothNumber);
    
    const toothShape = getToothShape(toothNumber);
    const isClickable = activeTab === 'planning' || (activeTab === 'scheduling' && status !== 'healthy');
    const isSelectedForAppointment = appointmentTeeth.includes(toothNumber);

    return (
      <div className="relative">
        <div
          className={`
            ${toothShape.size} ${toothShape.className} border-2 transition-all duration-200 
            flex items-center justify-center text-xs font-bold shadow-lg relative overflow-hidden
            ${statusColors[status]}
            ${isRadiationAffected ? 'ring-2 ring-purple-300 animate-pulse' : ''}
            ${isSelectedForAppointment ? 'ring-4 ring-blue-400 scale-110' : ''}
            ${isClickable ? 'cursor-pointer hover:scale-110 hover:z-20' : 'cursor-default'}
            ${isMobile ? 'active:scale-95' : ''}
          `}
          onClick={() => {
            if (isClickable) {
              handleToothClick(toothNumber);
            }
          }}
          title={`Tooth ${toothNumber} - ${statusLabels[status]}${surfaces.length > 0 ? ` (${surfaces.join(', ')})` : ''}`}
        >
          {renderToothGrooves(toothShape.grooves, status)}
          
          {status !== 'healthy' && (
            <div className="text-xs font-bold text-white z-10 drop-shadow-sm">
              {status === 'filling' ? 'F' :
               status === 'crown' ? 'C' :
               status === 'root_canal' ? 'R' :
               status === 'implant' ? 'I' :
               status === 'surgical' ? 'S' :
               status === 'extract' ? 'X' :
               status === 'consider' ? '?' :
               status === 'root_planing' ? 'RP' :
               status === 'scaling' ? 'SC' :
               status === 'other' ? 'O' : ''}
            </div>
          )}
          
          {renderToothSurfaces(toothNumber, surfaces)}
        </div>
      </div>
    );
  };

  const getTreatmentSummary = () => {
    const summary = {};
    let totalTeeth = 0;
    let totalSurfaces = 0;
    
    Object.entries(teethStatus).forEach(([tooth, data]) => {
      if (data?.status && data.status !== 'healthy') {
        const toothNum = parseInt(tooth);
        const surfaces = data.surfaces || [];
        
        if (!summary[data.status]) {
          summary[data.status] = { count: 0, teeth: [], surfaces: [] };
        }
        summary[data.status].count++;
        summary[data.status].teeth.push(toothNum);
        if (surfaces.length > 0) {
          summary[data.status].surfaces.push({
            tooth: toothNum,
            surfaces: surfaces.map(s => surfaceAbbreviations[s] || s.charAt(0).toUpperCase())
          });
        }
        
        totalTeeth++;
        totalSurfaces += surfaces.length;
      }
    });
    
    return { summary, totalTeeth, totalSurfaces };
  };

  const resetTreatmentPlan = () => {
    setTeethStatus({});
    setShowRadiationMode(true);
    setCancerType('');
    setAppointmentTeeth([]);
    setAppointments([]);
  };

  const renderCompactToothGrid = () => {
    const scheduledTeeth = new Set();
    appointments.forEach(appointment => {
      appointment.teeth.forEach(tooth => {
        scheduledTeeth.add(tooth.number);
      });
    });
    
    return (
      <div className="space-y-3">
        <div className="text-sm text-gray-600 mb-2">Upper Teeth</div>
        <div className="flex flex-wrap justify-center gap-1">
          {teethLayout.upper.map(toothNumber => {
            const toothData = teethStatus[toothNumber] || { status: 'healthy' };
            const isSelected = appointmentTeeth.includes(toothNumber);
            const isScheduled = scheduledTeeth.has(toothNumber);
            const canSelect = toothData.status !== 'healthy' && !isScheduled;
            
            return (
              <button
                key={toothNumber}
                className={`
                  w-6 h-6 text-xs font-bold border rounded transition-all duration-200 relative
                  ${isSelected ? 'ring-2 ring-blue-400 scale-110' : ''}
                  ${isScheduled ? 'ring-2 ring-green-400 opacity-50 cursor-not-allowed' : ''}
                  ${canSelect && !isScheduled ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-50'}
                  ${statusColors[toothData.status]}
                `}
                disabled={!canSelect}
                onClick={() => {
                  if (canSelect && !isScheduled) {
                    setAppointmentTeeth(prev => 
                      prev.includes(toothNumber) ? 
                        prev.filter(t => t !== toothNumber) : 
                        [...prev, toothNumber]
                    );
                  }
                }}
                title={`Tooth ${toothNumber} - ${statusLabels[toothData.status]}${isScheduled ? ' (Already scheduled)' : ''}`}
              >
                {toothData.status !== 'healthy' ? (
                  <span className="text-white drop-shadow-sm">
                    {toothData.status === 'filling' ? 'F' :
                     toothData.status === 'crown' ? 'C' :
                     toothData.status === 'root_canal' ? 'R' :
                     toothData.status === 'implant' ? 'I' :
                     toothData.status === 'surgical' ? 'S' :
                     toothData.status === 'extract' ? 'X' :
                     toothData.status === 'consider' ? '?' :
                     toothData.status === 'root_planing' ? 'RP' :
                     toothData.status === 'scaling' ? 'SC' :
                     toothData.status === 'other' ? 'O' : toothNumber}
                  </span>
                ) : (
                  <span className="text-gray-500">{toothNumber}</span>
                )}
                {isScheduled && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full text-xs flex items-center justify-center text-white">
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>
        
        <div className="text-sm text-gray-600 mb-2">Lower Teeth</div>
        <div className="flex flex-wrap justify-center gap-1">
          {teethLayout.lower.map(toothNumber => {
            const toothData = teethStatus[toothNumber] || { status: 'healthy' };
            const isSelected = appointmentTeeth.includes(toothNumber);
            const isScheduled = scheduledTeeth.has(toothNumber);
            const canSelect = toothData.status !== 'healthy' && !isScheduled;
            
            return (
              <button
                key={toothNumber}
                className={`
                  w-6 h-6 text-xs font-bold border rounded transition-all duration-200 relative
                  ${isSelected ? 'ring-2 ring-blue-400 scale-110' : ''}
                  ${isScheduled ? 'ring-2 ring-green-400 opacity-50 cursor-not-allowed' : ''}
                  ${canSelect && !isScheduled ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-50'}
                  ${statusColors[toothData.status]}
                `}
                disabled={!canSelect}
                onClick={() => {
                  if (canSelect && !isScheduled) {
                    setAppointmentTeeth(prev => 
                      prev.includes(toothNumber) ? 
                        prev.filter(t => t !== toothNumber) : 
                        [...prev, toothNumber]
                    );
                  }
                }}
                title={`Tooth ${toothNumber} - ${statusLabels[toothData.status]}${isScheduled ? ' (Already scheduled)' : ''}`}
              >
                {toothData.status !== 'healthy' ? (
                  <span className="text-white drop-shadow-sm">
                    {toothData.status === 'filling' ? 'F' :
                     toothData.status === 'crown' ? 'C' :
                     toothData.status === 'root_canal' ? 'R' :
                     toothData.status === 'implant' ? 'I' :
                     toothData.status === 'surgical' ? 'S' :
                     toothData.status === 'extract' ? 'X' :
                     toothData.status === 'consider' ? '?' :
                     toothData.status === 'root_planing' ? 'RP' :
                     toothData.status === 'scaling' ? 'SC' :
                     toothData.status === 'other' ? 'O' : toothNumber}
                  </span>
                ) : (
                  <span className="text-gray-500">{toothNumber}</span>
                )}
                {isScheduled && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full text-xs flex items-center justify-center text-white">
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const generateProcedureSummary = (teethList) => {
    const procedureGroups = {};
    
    teethList.forEach(toothNumber => {
      const toothData = teethStatus[toothNumber];
      const procedure = procedures.find(p => p.value === toothData?.status);
      const procedureKey = procedure?.value || 'unknown';
      
      if (!procedureGroups[procedureKey]) {
        procedureGroups[procedureKey] = {
          label: procedure?.label || 'Unknown',
          thai: procedure?.thai || 'การรักษา',
          teeth: []
        };
      }
      
      const surfaces = toothData?.surfaces || [];
      const surfaceText = surfaces.length > 0 ? 
        `: ${surfaces.map(s => surfaceAbbreviations[s] || s.charAt(0).toUpperCase()).join(' ')}` : '';
      
      procedureGroups[procedureKey].teeth.push({
        number: toothNumber,
        surfaceText
      });
    });
    
    return Object.values(procedureGroups).map(group => {
      const teethCount = group.teeth.length;
      const teethNumbers = group.teeth.map(t => t.number).join(',');
      const teethWithSurfaces = group.teeth.filter(t => t.surfaceText).map(t => `ซี่ ${t.number}${t.surfaceText}`).join(', ');
      
      let result = `**${group.label} (${group.thai})**: [${teethCount} ซี่] : ${teethNumbers}`;
      if (teethWithSurfaces) {
        result += `\n${teethWithSurfaces}`;
      }
      
      return result;
    }).join('\n');
  };

  const addAppointment = () => {
    if (selectedDate && appointmentTeeth.length > 0) {
      const procedureText = appointmentNotes || generateProcedureSummary(appointmentTeeth);

      const newAppointment = {
        id: appointments.length + 1,
        date: selectedDate,
        time: selectedTime,
        title: `การนัดครั้งที่ ${appointments.length + 1}`,
        teeth: appointmentTeeth.map(toothNumber => {
          const toothData = teethStatus[toothNumber];
          const procedure = procedures.find(p => p.value === toothData?.status);
          return {
            number: toothNumber,
            surfaces: toothData?.surfaces || [],
            procedure: procedure?.label || toothData?.status || 'Unknown',
            notes: `${procedure?.thai || 'การรักษา'} ฟัน ${toothNumber}`
          };
        }),
        duration: `${appointmentTeeth.length * 30} min`,
        status: 'scheduled',
        patientNotes: procedureText
      };
      
      setAppointments(prev => [...prev, newAppointment]);
      setAppointmentTeeth([]);
      setSelectedDate('');
      setSelectedTime('09:30');
      setAppointmentNotes('');
    }
  };

  const deleteAppointment = (appointmentId) => {
    setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
  };

  const updateAppointmentDateTime = (appointmentId, newDate, newTime) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId ? { ...apt, date: newDate, time: newTime } : apt
    ));
  };

  const updateAppointmentNotes = (appointmentId, newNotes) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId ? { ...apt, patientNotes: newNotes } : apt
    ));
  };

  const getRadiationTimeline = () => {
    if (!radiationDate) return null;
    
    const radDate = new Date(radiationDate);
    const earliest = new Date(radDate);
    earliest.setDate(radDate.getDate() - 21);
    const latest = new Date(radDate);
    latest.setDate(radDate.getDate() - 14);
    
    return {
      radiationDate: radDate.toLocaleDateString('th-TH'),
      earliestStart: earliest.toLocaleDateString('th-TH'),
      latestFinish: latest.toLocaleDateString('th-TH'),
      earliestStartEn: earliest.toISOString().split('T')[0],
      latestFinishEn: latest.toISOString().split('T')[0]
    };
  };

  const generateTreatmentReport = () => {
    const { summary } = getTreatmentSummary();
    const reportDate = new Date().toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return {
      patientInfo,
      summary,
      appointments,
      reportDate,
      radiationMode: showRadiationMode,
      cancerType: cancerType ? cancerTypes.find(c => c.value === cancerType)?.label : null
    };
  };

  const getToothSurfaces = (toothNumber) => {
    const isUpper = toothNumber >= 11 && toothNumber <= 28;
    const isAnterior = (toothNumber >= 11 && toothNumber <= 13) || 
                      (toothNumber >= 21 && toothNumber <= 23) ||
                      (toothNumber >= 31 && toothNumber <= 33) || 
                      (toothNumber >= 41 && toothNumber <= 43);
    
    if (isUpper && isAnterior) {
      return [
        { value: 'palatal', label: 'Palatal', color: 'bg-blue-400', position: 'top' },
        { value: 'distal', label: 'Distal', color: 'bg-orange-400', position: 'right' },
        { value: 'labial', label: 'Labial', color: 'bg-green-400', position: 'bottom' },
        { value: 'mesial', label: 'Mesial', color: 'bg-pink-400', position: 'left' },
        { value: 'incisal', label: 'Incisal', color: 'bg-purple-400', position: 'center' }
      ];
    } else if (isUpper && !isAnterior) {
      return [
        { value: 'palatal', label: 'Palatal', color: 'bg-blue-400', position: 'top' },
        { value: 'distal', label: 'Distal', color: 'bg-orange-400', position: 'right' },
        { value: 'buccal', label: 'Buccal', color: 'bg-green-400', position: 'bottom' },
        { value: 'mesial', label: 'Mesial', color: 'bg-pink-400', position: 'left' },
        { value: 'occlusal', label: 'Occlusal', color: 'bg-yellow-400', position: 'center' }
      ];
    } else if (!isUpper && isAnterior) {
      return [
        { value: 'lingual', label: 'Lingual', color: 'bg-blue-400', position: 'top' },
        { value: 'distal', label: 'Distal', color: 'bg-orange-400', position: 'right' },
        { value: 'labial', label: 'Labial', color: 'bg-green-400', position: 'bottom' },
        { value: 'mesial', label: 'Mesial', color: 'bg-pink-400', position: 'left' },
        { value: 'incisal', label: 'Incisal', color: 'bg-purple-400', position: 'center' }
      ];
    } else {
      return [
        { value: 'lingual', label: 'Lingual', color: 'bg-blue-400', position: 'top' },
        { value: 'distal', label: 'Distal', color: 'bg-orange-400', position: 'right' },
        { value: 'buccal', label: 'Buccal', color: 'bg-green-400', position: 'bottom' },
        { value: 'mesial', label: 'Mesial', color: 'bg-pink-400', position: 'left' },
        { value: 'occlusal', label: 'Occlusal', color: 'bg-yellow-400', position: 'center' }
      ];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-4 md:p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-3">
            <Stethoscope className="w-6 h-6 md:w-8 md:h-8" />
            <div>
              <h1 className="text-lg md:text-2xl font-bold">
                Dental Treatment Planning System
              </h1>
              <p className="text-emerald-100 mt-1 text-sm md:text-base">
                Enhanced UI & Fixed Flow
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <User className="w-5 h-5 md:w-6 md:h-6" />
            <div className="text-right">
              <div className="font-semibold text-sm md:text-base">
                {patientInfo.name}
              </div>
              <div className="text-xs md:text-sm text-emerald-100">
                HN: {patientInfo.hn} | Age {patientInfo.age}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Tab Navigation */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex py-2 space-x-1">
            {isMobile ? (
              <div className="grid grid-cols-2 gap-1 w-full">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      className={`
                        flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 font-medium text-xs
                        ${isActive ? 
                          'bg-blue-100 text-blue-800 border border-blue-600' : 
                          'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
                        }
                      `}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <Icon className={`w-4 h-4 ${
                        isActive ? 'text-blue-600' : 'text-gray-500'
                      }`} />
                      <span className="text-center leading-tight">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    className={`
                      flex items-center space-x-2 px-6 py-3 rounded-t-lg whitespace-nowrap transition-all duration-200 font-medium text-base
                      ${isActive ? 
                        'bg-blue-100 text-blue-800 border-b-2 border-blue-600' : 
                        'bg-gray-50 text-gray-600 hover:bg-gray-100 border-b-2 border-transparent'
                      }
                    `}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon className={`w-5 h-5 ${
                      isActive ? 'text-blue-600' : 'text-gray-500'
                    }`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-3 md:p-6">
        {activeTab === 'planning' && (
          <>
            {/* Control Panel */}
            <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                  <Wrench className="w-5 h-5 text-blue-600" />
                  <span>Planning Tools</span>
                </h3>
                <button
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={resetTreatmentPlan}
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>
              
              {/* Radiation Mode Toggle */}
              <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center space-x-2 text-orange-800 font-medium">
                    <Radiation className="w-5 h-5" />
                    <span>Radiation Pre-treatment Mode</span>
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={showRadiationMode}
                      onChange={(e) => setShowRadiationMode(e.target.checked)}
                    />
                    <div className={`w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer transition-colors duration-200 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${showRadiationMode ? 'bg-orange-600' : 'bg-gray-200'}`} />
                  </label>
                </div>
                
                {showRadiationMode && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-orange-700">
                        Cancer Type:
                      </label>
                      <select
                        className="w-full p-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        value={cancerType}
                        onChange={(e) => setCancerType(e.target.value)}
                      >
                        <option value="">Select cancer type...</option>
                        {cancerTypes.map(type => 
                          <option key={type.value} value={type.value}>
                            {type.label} - {type.thai}
                          </option>
                        )}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-orange-700">
                        วันที่ฉายรังสี (Radiation Date):
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        value={radiationDate}
                        onChange={(e) => setRadiationDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Dental Chart */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center space-x-2">
                <Layers className="w-5 h-5 text-blue-600" />
                <span>Dental Chart - Click to Cycle Status</span>
              </h3>

              {/* Main Chart */}
              <div className="relative bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl border-2 border-emerald-200 p-4 md:p-8 mb-6">
                <div 
                  className="relative mx-auto flex items-center justify-center"
                  style={{ 
                    width: isMobile ? '100%' : '600px',
                    height: isMobile ? '400px' : '600px',
                    maxWidth: '100%'
                  }}
                >
                  <div 
                    className="relative"
                    style={{ 
                      width: isMobile ? '380px' : '500px',
                      height: isMobile ? '380px' : '500px'
                    }}
                  >
                    {/* Gum backgrounds */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      style={{ zIndex: 1 }}
                    >
                      <path
                        d="M 25,35 Q 30,25 40,23 Q 50,22 60,23 Q 70,25 75,35 Q 70,30 60,28 Q 50,27 40,28 Q 30,30 25,35 Z"
                        fill="rgba(236, 72, 153, 0.4)"
                        stroke="rgba(219, 39, 119, 0.6)"
                        strokeWidth="0.5"
                      />
                      <path
                        d="M 25,65 Q 30,75 40,77 Q 50,78 60,77 Q 70,75 75,65 Q 70,70 60,72 Q 50,73 40,72 Q 30,70 25,65 Z"
                        fill="rgba(236, 72, 153, 0.4)"
                        stroke="rgba(219, 39, 119, 0.6)"
                        strokeWidth="0.5"
                      />
                    </svg>
                    
                    {/* Teeth */}
                    {[...teethLayout.upper, ...teethLayout.lower].map((toothNumber) => {
                      const positions = getCircularPosition(toothNumber, 400, 400);
                      const toothData = teethStatus[toothNumber] || { status: 'healthy' };
                      const status = toothData.status;
                      
                      const labelTextColor = status === 'healthy' ? 'text-gray-700' : 
                                           status === 'consider' ? 'text-yellow-800' :
                                           status === 'extract' ? 'text-red-800' :
                                           status === 'filling' ? 'text-orange-800' :
                                           status === 'crown' ? 'text-purple-800' :
                                           status === 'root_canal' ? 'text-pink-800' :
                                           status === 'surgical' ? 'text-cyan-800' :
                                           status === 'implant' ? 'text-gray-800' :
                                           'text-gray-800';
                      
                      return [
                        <div
                          key={`tooth-${toothNumber}`}
                          className="absolute"
                          style={{
                            left: positions.tooth.left,
                            top: positions.tooth.top,
                            zIndex: 10,
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          {renderTooth(toothNumber)}
                        </div>,
                        
                        <div
                          key={`label-${toothNumber}`}
                          className="absolute"
                          style={{
                            left: positions.label.left,
                            top: positions.label.top,
                            zIndex: 15,
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          <div
                            className={`
                              text-xs px-2 py-1 font-bold bg-white/60 rounded-full shadow-md border border-gray-300
                              hover:bg-white/80 hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-110
                              ${labelTextColor}
                            `}
                            onClick={() => handleToothClick(toothNumber)}
                            title={`Click to cycle status for tooth ${toothNumber}`}
                          >
                            {toothNumber}
                          </div>
                        </div>
                      ];
                    }).flat()}

                    {/* Center Info */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
                      <div className="bg-white/90 rounded-full p-3 shadow-lg border border-emerald-200">
                        <Stethoscope className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                        <div className="text-sm font-semibold text-emerald-800">
                          {patientInfo.name.split(' ')[1] || 'Patient'}
                        </div>
                        <div className="text-xs text-gray-600">
                          HN: {patientInfo.hn}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Treatment Status Legend */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="text-sm font-semibold mb-3 text-gray-800">
                  Treatment Status Legend & Summary
                </h5>
                
                {(() => {
                  const { summary } = getTreatmentSummary();
                  
                  return (
                    <div className="space-y-4">
                      {/* Text Summary */}
                      {Object.keys(summary).length > 0 && (
                        <div className="space-y-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          {Object.entries(summary).map(([status, data]) => {
                            const procedure = procedures.find(p => p.value === status);
                            const surfaceInfo = data.surfaces.length > 0 ? 
                              data.surfaces.map(s => ` ซี่ ${s.tooth}: ${s.surfaces.join(' ')}`).join(', ') : '';
                            
                            return (
                              <div key={status} className="text-sm text-gray-700">
                                <strong>{procedure?.label || status} ({procedure?.thai || status})</strong>
                                <span>: [{data.count} ซี่] : {data.teeth.join(',')}</span>
                                {surfaceInfo && <span> :{surfaceInfo}</span>}
                              </div>
                            );
                          })}
                        </div>
                      )}
                      
                      {/* Status Legend */}
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {[
                          { status: 'healthy', color: 'bg-white border-gray-300 text-gray-600', label: 'Healthy', abbr: '' },
                          { status: 'consider', color: 'bg-yellow-400 border-yellow-500 text-white', label: 'Consider', abbr: '(พิจารณา)' },
                          { status: 'extract', color: 'bg-red-400 border-red-500 text-white', label: 'Extract', abbr: '(ถอน)' },
                          { status: 'filling', color: 'bg-orange-400 border-orange-500 text-white', label: 'Filling', abbr: '(อุด)' },
                          { status: 'crown', color: 'bg-purple-400 border-purple-500 text-white', label: 'Crown', abbr: '(ครอบ)' },
                          { status: 'root_canal', color: 'bg-pink-400 border-pink-500 text-white', label: 'Root Canal', abbr: '(รักษาราก)' },
                          { status: 'surgical', color: 'bg-cyan-400 border-cyan-500 text-white', label: 'Surgical', abbr: '(ผ่าฟันคุด)' },
                          { status: 'implant', color: 'bg-gray-400 border-gray-500 text-white', label: 'Implant', abbr: '(รากเทียม)' },
                          { status: 'root_planing', color: 'bg-teal-400 border-teal-500 text-white', label: 'Root Planing', abbr: '(เกลาราก)' },
                          { status: 'scaling', color: 'bg-lime-400 border-lime-500 text-white', label: 'Scaling', abbr: '(ขูดหินปูน)' }
                        ].map((item, index) => {
                          const statusData = summary[item.status];
                          const count = statusData ? statusData.count : 0;
                          
                          return (
                            <div
                              key={index}
                              className={`flex items-center justify-between p-2 bg-white rounded border ${count > 0 ? 'ring-2 ring-blue-200' : ''}`}
                            >
                              <div className="flex items-center space-x-2">
                                <div className={`w-6 h-6 rounded border-2 ${item.color}`} />
                                <div className="text-sm">
                                  <div className="text-gray-700">{item.label}</div>
                                  {item.abbr && <div className="text-xs text-gray-500">{item.abbr}</div>}
                                </div>
                              </div>
                              {count > 0 && (
                                <div className="text-lg font-bold text-blue-600">
                                  {count}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </>
        )}

        {activeTab === 'scheduling' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                <Calendar className="w-6 h-6 text-purple-600" />
                <span>Appointments</span>
              </h2>
            </div>

            <div className="space-y-6">
              {/* Radiation Timeline */}
              {showRadiationMode && radiationDate && (() => {
                const timeline = getRadiationTimeline();
                return (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="text-lg font-semibold text-orange-800 mb-3 flex items-center">
                      <Radiation className="w-5 h-5 mr-2" />
                      ⏰ Timeline สำหรับการรักษา
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-orange-300">
                      <div className="text-sm text-orange-800 space-y-2">
                        <div>
                          <strong>วันที่ฉายรังสี:</strong> {timeline.radiationDate}
                        </div>
                        <div className="bg-orange-100 p-3 rounded border border-orange-200">
                          <div className="text-xs text-orange-900 mb-1">
                            <strong>ควรถอนฟันให้เสร็จก่อนฉายรังสี:</strong>
                          </div>
                          <div className="text-sm font-bold text-orange-900">
                            {timeline.earliestStart} (21 วัน) - {timeline.latestFinish} (14 วัน)
                          </div>
                        </div>
                        <div className="text-xs text-orange-700">
                          • ไม่ควรนัดช้าไปกว่า: <strong>{timeline.latestFinish}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
              <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-dashed border-green-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    การนัดครั้งที่ {appointments.length + 1}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        วันที่
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                            (() => {
                              if (!radiationDate || !selectedDate) return '';
                              const timeline = getRadiationTimeline();
                              if (!timeline) return '';
                              const selDate = new Date(selectedDate);
                              const radDate = new Date(radiationDate);
                              const diffDays = Math.ceil((radDate - selDate) / (1000 * 60 * 60 * 24));
                              
                              if (diffDays < 14) {
                                return 'border-red-400 bg-red-50';
                              } else if (diffDays >= 14 && diffDays <= 21) {
                                return 'border-yellow-400 bg-yellow-50';
                              } else {
                                return 'border-green-400 bg-green-50';
                              }
                            })()
                          }`}
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          placeholder="dd/mm/yyyy"
                        />
                        {radiationDate && selectedDate && (() => {
                          const timeline = getRadiationTimeline();
                          if (!timeline) return null;
                          const selDate = new Date(selectedDate);
                          const radDate = new Date(radiationDate);
                          const diffDays = Math.ceil((radDate - selDate) / (1000 * 60 * 60 * 24));
                          
                          let icon = '';
                          if (diffDays < 14) {
                            icon = '🔴';
                          } else if (diffDays >= 14 && diffDays <= 21) {
                            icon = '🟡';
                          } else {
                            icon = '🟢';
                          }
                          
                          return (
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs">
                              {icon}
                            </div>
                          );
                        })()}
                      </div>
                      {radiationDate && selectedDate && (() => {
                        const timeline = getRadiationTimeline();
                        if (!timeline) return null;
                        const selDate = new Date(selectedDate);
                        const radDate = new Date(radiationDate);
                        const diffDays = Math.ceil((radDate - selDate) / (1000 * 60 * 60 * 24));
                        
                        let statusText = '';
                        if (diffDays < 14) {
                          statusText = '🔴 ช้าเกินไป';
                        } else if (diffDays >= 14 && diffDays <= 21) {
                          statusText = '🟡 อยู่ในช่วง 14-21 วัน ก่อนฉายรังสี';
                        } else {
                          statusText = '🟢 ก่อนฉายรังสี มากกว่า 21 วัน';
                        }
                        
                        return (
                          <div className="mt-1 text-xs text-gray-600">
                            <div>{statusText}</div>
                            <div>ช่วงเหมาะสม: {timeline.earliestStart} - {timeline.latestFinish}</div>
                          </div>
                        );
                      })()}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        เวลา
                      </label>
                      <input
                        type="time"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Procedure
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white min-h-24 resize-y"
                      placeholder="กรุณาเลือกฟันที่ต้องการรักษา..."
                      value={appointmentTeeth.length > 0 ? 
                        (appointmentNotes || generateProcedureSummary(appointmentTeeth)) : 
                        appointmentNotes || ''
                      }
                      onChange={(e) => {
                        setAppointmentNotes(e.target.value);
                      }}
                      rows={4}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      สามารถแก้ไขและเพิ่มรายละเอียดเพิ่มเติมได้
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ฟันที่เลือก
                    </label>
                    <div className="text-xs text-gray-500 mb-2">
                      เลือกฟัน (เลือกฟันที่นี่) | ฟันที่มี ✓ = นัดไปแล้ว
                    </div>
                    {renderCompactToothGrid()}
                  </div>
                  
                  {selectedDate && appointmentTeeth.length > 0 && (
                    <div className="pt-4 border-t">
                      <button
                        className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                        onClick={addAppointment}
                      >
                        เพิ่มการนัดครั้งที่ {appointments.length + 1} ({appointmentTeeth.length} ฟัน)
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {appointments.map((appointment) => {
                const timeline = getRadiationTimeline();
                const appointmentDate = new Date(appointment.date);
                let statusColor = '';
                let statusText = '';
                let statusIcon = '';
                
                if (timeline) {
                  const radDate = new Date(radiationDate);
                  const diffDays = Math.ceil((radDate - appointmentDate) / (1000 * 60 * 60 * 24));
                  
                  if (diffDays < 14) {
                    statusColor = 'border-red-300 bg-red-50';
                    statusText = 'ช้าเกินไป';
                    statusIcon = '🔴';
                  } else if (diffDays >= 14 && diffDays <= 21) {
                    statusColor = 'border-yellow-300 bg-yellow-50';
                    statusText = 'อยู่ในช่วง 14-21 วัน ก่อนฉายรังสี';
                    statusIcon = '🟡';
                  } else {
                    statusColor = 'border-green-300 bg-green-50';
                    statusText = 'ก่อนฉายรังสี มากกว่า 21 วัน';
                    statusIcon = '🟢';
                  }
                }
                
                return (
                  <div
                    key={`appointment-${appointment.id}`}
                    className={`bg-white p-6 rounded-lg shadow-lg border ${statusColor || 'border-gray-200'}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {appointment.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {timeline && statusText && (
                          <div className={`text-xs px-2 py-1 rounded ${
                            statusIcon === '🔴' ? 'bg-red-200 text-red-800' : 
                            statusIcon === '🟡' ? 'bg-yellow-200 text-yellow-800' :
                            'bg-green-200 text-green-800'
                          }`}>
                            {statusIcon} {statusText}
                          </div>
                        )}
                        <button
                          className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded"
                          onClick={() => deleteAppointment(appointment.id)}
                          title="Delete appointment"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            วันที่
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              className={`w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${statusColor}`}
                              value={appointment.date}
                              onChange={(e) => updateAppointmentDateTime(appointment.id, e.target.value, appointment.time)}
                              min={new Date().toISOString().split('T')[0]}
                            />
                            {timeline && statusIcon && (
                              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs">
                                {statusIcon}
                              </div>
                            )}
                          </div>
                          {timeline && (
                            <div className="mt-1 text-xs text-gray-600">
                              เหมาะสม: {timeline.earliestStart} - {timeline.latestFinish}
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            เวลา
                          </label>
                          <input
                            type="time"
                            className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            value={appointment.time || '09:30'}
                            onChange={(e) => updateAppointmentDateTime(appointment.id, appointment.date, e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Procedure
                        </label>
                        <textarea
                          className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-20 resize-y"
                          value={appointment.patientNotes || ''}
                          onChange={(e) => updateAppointmentNotes(appointment.id, e.target.value)}
                          placeholder="กรุณาใส่รายละเอียดการรักษา..."
                          rows={3}
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          สามารถแก้ไขและเพิ่มรายละเอียดเพิ่มเติมได้
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Radiation Mode Guidelines */}
            {showRadiationMode && (
              <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-orange-800 mb-4">
                  📋 แนะนำการวางแผนการนัดสำหรับผู้ป่วยฉายรังสี
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-orange-300">
                    <h4 className="font-semibold text-orange-700 mb-3">📋 ลำดับการถอนฟันที่แนะนำ</h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-orange-100 rounded text-orange-800">
                        เริ่มจากฟันล่างหากไม่มี tumor (แผลจะได้หายทัน)
                      </div>
                      <div className="p-2 bg-orange-100 rounded text-orange-800">
                        ถอนฟันที่อยู่ออกจากบริเวณ tumor ก่อน
                      </div>
                      <div className="p-2 bg-orange-100 rounded text-orange-800">
                        ถอนฟันใกล้ tumor เป็นตำแหน่งสุดท้าย
                      </div>
                      <div className="p-2 bg-orange-100 rounded text-orange-800">
                        นัดติดตามทุก 1-2 วันหลังถอนฟัน
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-orange-300">
                    <h4 className="font-semibold text-orange-700 mb-3">💡 ข้อแนะนำสำคัญ</h4>
                    <ul className="space-y-1 text-sm text-orange-800">
                      <li>• เวลาเหมาะสม: 14-21 วันก่อนเริ่มฉายรังสี</li>
                      <li>• ถอนฟันครั้งละ Quadrant หรือ Sextant</li>
                      <li>• ใช้เทคนิค Atraumatic extraction</li>
                      <li>• Primary closure หากทำได้</li>
                      <li>• ควบคุมเลือดให้หยุดสนิท</li>
                      <li>• ให้ยาแก้ปวดเพียงพอ</li>
                      <li>• พิจารณาให้ยาปฏิชีวนะในกรณีเสี่ยง</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-orange-300">
                    <h4 className="font-semibold text-orange-700 mb-3">📅 แผนการรักษาและไทม์ไลน์</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                        <div className="text-orange-800">
                          <strong>วันที่ 1-2:</strong> รับใบส่งตัว ประเมินผู้ป่วย และวางแผนการรักษา
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                        <div className="text-orange-800">
                          <strong>วันที่ 3-7:</strong> ถอนฟันครั้งที่ 1 (Quadrant/Sextant)
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                        <div className="text-orange-800">
                          <strong>วันที่ 8-12:</strong> ถอนฟันครั้งที่ 2 และติดตามการหาย
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                        <div className="text-orange-800">
                          <strong>วันที่ 13-17:</strong> ถอนฟันครั้งสุดท้าย (หากจำเป็น)
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">5</div>
                        <div className="text-orange-800">
                          <strong>วันที่ 18-21:</strong> ตรวจติดตาม ให้คำแนะนำการดูแลช่องปาก
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'export' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2 mb-4">
                <Download className="w-6 h-6 text-green-600" />
                <span>Treatment Summary Report</span>
              </h2>
              
              {(() => {
                const report = generateTreatmentReport();
                return (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="font-semibold text-blue-800 mb-3">
                        Patient Information
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">ชื่อผู้ป่วย: </span>
                          <span>{report.patientInfo.name}</span>
                        </div>
                        <div>
                          <span className="font-medium">HN: </span>
                          <span>{report.patientInfo.hn}</span>
                        </div>
                        <div>
                          <span className="font-medium">อายุ: </span>
                          <span>{report.patientInfo.age} ปี</span>
                        </div>
                        <div>
                          <span className="font-medium">วันที่รายงาน: </span>
                          <span>{report.reportDate}</span>
                        </div>
                      </div>
                    </div>

                    {Object.keys(report.summary).length > 0 && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                        <h3 className="font-semibold text-green-800 mb-3">
                          Treatment Plan Summary
                        </h3>
                        <div className="space-y-2">
                          {Object.entries(report.summary).map(([status, data]) => {
                            const procedure = procedures.find(p => p.value === status);
                            const surfaceInfo = data.surfaces.length > 0 ? 
                              data.surfaces.map(s => ` ซี่ ${s.tooth}: ${s.surfaces.join(' ')}`).join(', ') : '';
                            
                            return (
                              <div
                                key={status}
                                className="text-sm bg-white p-3 rounded border border-green-300"
                              >
                                <div>
                                  <strong>{procedure?.label || status} ({procedure?.thai || status})</strong>
                                  <span>: [{data.count} ซี่] : {data.teeth.join(',')}</span>
                                </div>
                                {surfaceInfo && (
                                  <div className="text-xs text-gray-600 mt-1">
                                    Surface details:{surfaceInfo}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {report.appointments.length > 0 && (
                      <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg border border-purple-200">
                        <h3 className="font-semibold text-purple-800 mb-3">
                          Scheduled Appointments
                        </h3>
                        <div className="space-y-2">
                          {report.appointments.map((appointment) => 
                            <div
                              key={appointment.id}
                              className="text-sm bg-white p-3 rounded border border-purple-300"
                            >
                              <div className="font-medium">{appointment.title}</div>
                              <div className="text-gray-600">
                                วันที่: {new Date(appointment.date).toLocaleDateString('th-TH')} เวลา {appointment.time || '09:30'} น.
                              </div>
                              <div className="text-gray-600 whitespace-pre-line">
                                {appointment.patientNotes}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {report.radiationMode && (
                      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
                        <h3 className="font-semibold text-orange-800 mb-3">
                          Radiation Treatment Information
                        </h3>
                        <div className="text-sm space-y-2">
                          <div>โหมด: Radiation Pre-treatment Mode</div>
                          {report.cancerType && (
                            <div>ประเภทมะเร็ง: {report.cancerType}</div>
                          )}
                          {radiationDate && (
                            <div className="bg-orange-100 p-3 rounded border border-orange-200 mt-2">
                              <div><strong>วันที่ฉายรังสี:</strong> {new Date(radiationDate).toLocaleDateString('th-TH')}</div>
                              {(() => {
                                const timeline = getRadiationTimeline();
                                return timeline && (
                                  <div className="text-xs mt-1 text-orange-700">
                                    ควรถอนฟันให้เสร็จก่อน: {timeline.earliestStart} (21 วัน) - {timeline.latestFinish} (14 วัน)
                                  </div>
                                );
                              })()}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4 pt-4">
                      <button
                        className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={() => window.print()}
                      >
                        <Printer className="w-4 h-4" />
                        <span>Print Report</span>
                      </button>
                      <button
                        className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        onClick={() => {
                          const reportText = JSON.stringify(report, null, 2);
                          navigator.clipboard.writeText(reportText);
                        }}
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copy Data</span>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {activeTab === 'instructions' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2 mb-6">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                <span>Instructions - คำแนะนำการใช้งาน</span>
              </h2>

              <div className="mb-6 p-5 rounded-2xl border-l-4 border-cyan-500 bg-gradient-to-r from-gray-50 to-gray-100">
                <h4 className="text-cyan-600 mb-4 text-center text-lg font-semibold">
                  📏 Shortened Dental Arch Concept
                </h4>
                <div className="text-sm space-y-3">
                  <p>
                    <strong>แนวคิดการเก็บฟัน:</strong>
                  </p>
                  <ul className="space-y-2 ml-5">
                    <li>
                      <strong>4 OU (Occlusal Units):</strong>
                      <br />
                      เก็บฟันหน้า + ฟันกรามน้อย
                    </li>
                    <li>
                      <strong>6 OU:</strong>
                      <br />
                      เก็บฟันหน้า + ฟันกรามน้อย + ฟันกราม 1 คู่
                    </li>
                    <li>
                      <strong>การทำงานที่เพียงพอ:</strong>
                      <br />
                      ≥ 4 OU สำหรับการเคี้ยวพื้นฐาน
                    </li>
                  </ul>
                  <div className="bg-cyan-50 p-3 rounded-lg mt-4 border border-cyan-200">
                    <small>
                      <strong>💡 หลักการ: </strong>
                      ไม่จำเป็นต้องเก็บฟันทุกซี่ ให้ความสำคัญกับฟันที่มีหน้าที่สำคัญและมีสภาพดี
                    </small>
                  </div>
                </div>
              </div>

              <div className="mb-6 bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  🎯 เกณฑ์การประเมินฟันตาม IMRT Chart
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-red-600 font-semibold mb-3">
                      ฟันในบริเวณรังสีสูง (&gt;60 Gy)
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>❌ ฟันผุบูรณะไม่ได้</li>
                      <li>❌ Root caries ลึกถึงเหงือก</li>
                      <li>❌ งานบูรณะใหญ่ + Pocket &gt;5mm</li>
                      <li>❌ ฟันสึกรุนแรง (Severe attrition)</li>
                      <li>❌ ฟันไม่มีคู่สบ (เหลือไม่กี่ซี่)</li>
                      <li>⚠️ Complete bony impacted → ไม่ต้องถอน</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-orange-600 font-semibold mb-3">
                      ฟันนอกบริเวณรังสี (&lt;60 Gy)
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>🔥 Pulpitis / Acute periodontitis</li>
                      <li>🔥 Pericoronitis ที่รุนแรง</li>
                      <li>⚠️ ฟันโยกหลุดง่าย (Risk aspiration)</li>
                      <li>💊 ฟันที่ทำให้ปวดเรื้อรัง</li>
                      <li>🩸 Active bleeding จากฟัน/เหงือก</li>
                      <li>📊 พิจารณาตาม Shortened Dental Arch</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  📖 Clinical Protocol
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="text-green-600 font-semibold mb-3">
                      Curative RT
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>เป้าหมาย: </strong>
                        รักษาให้หาย
                      </p>
                      <p>
                        <strong>Dose: </strong>
                        60-70 Gy (30-35 fractions)
                      </p>
                      <p>
                        <strong>การเตรียมช่องปาก: </strong>
                        Ideal - ฟันที่เหลือต้องมีสภาพดีมาก
                      </p>
                      <p>
                        <strong>เกณฑ์การถอน: </strong>
                        เข้มงวด
                      </p>
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="text-orange-600 font-semibold mb-3">
                      Palliative RT
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>เป้าหมาย: </strong>
                        ประคับประคอง
                      </p>
                      <p>
                        <strong>Dose: </strong>
                        30 Gy (10 fractions)
                      </p>
                      <p>
                        <strong>การเตรียมช่องปาก: </strong>
                        เฉพาะที่จำเป็น
                      </p>
                      <p>
                        <strong>เกณฑ์การถอน: </strong>
                        อาการรุนแรงเท่านั้น
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-red-600 font-semibold mb-3">
                    ⚠️ ภาวะแทรกซ้อนที่ต้องป้องกัน
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-red-600 font-medium">Osteoradionecrosis (ORN)</h4>
                      <ul className="text-sm mt-2 space-y-1">
                        <li>• เกิดจากรังสี &gt;60 Gy</li>
                        <li>• ส่วนใหญ่เกิดที่กราม (Mandible &gt; Maxilla)</li>
                        <li>• เสี่ยงสูงหากมีการถอนฟันหลังฉายรังสี</li>
                        <li>• ป้องกันด้วยการเตรียมช่องปากก่อนฉายรังสี</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-orange-600 font-medium">Radiation Caries</h4>
                      <ul className="text-sm mt-2 space-y-1">
                        <li>• เกิดจากการลดลงของน้ำลาย</li>
                        <li>• ฟันผุรวดเร็วหลังฉายรังสี</li>
                        <li>• ป้องกันด้วย Fluoride application</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Modal for procedure and surface selection */}
      {showProcedureModal && selectedTooth && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
          <div className={`bg-white rounded-xl w-full ${isMobile ? 'max-w-sm max-h-[75vh]' : 'max-w-lg max-h-[85vh]'} shadow-2xl flex flex-col`}>
            <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
              <h3 className="text-lg font-bold text-gray-800">
                Tooth {selectedTooth} - Surface Selection
              </h3>
              <button
                className="text-gray-500 hover:text-gray-700 p-1"
                onClick={() => {
                  // Reset tooth status to healthy when closing modal
                  setTeethStatus(prev => ({
                    ...prev,
                    [selectedTooth]: { status: 'healthy', surfaces: [] }
                  }));
                  setShowProcedureModal(false);
                  setSelectedProcedure('');
                  setSelectedSurfaces([]);
                  setProcedureNotes('');
                  setSelectedTooth(null);
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className={`${isMobile ? 'p-3' : 'p-4'} overflow-y-auto flex-1 space-y-3`}>
              {/* Select Procedure Section */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Select Procedure:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {procedures.map((procedure) => {
                    if (procedure.value === 'surgical' && procedure.restrictedTeeth && !procedure.restrictedTeeth.includes(selectedTooth)) {
                      return null;
                    }
                    
                    return (
                      <button
                        key={procedure.value}
                        className={`
                          p-2 rounded-lg border-2 transition-all duration-200 text-xs font-medium relative
                          ${selectedProcedure === procedure.value 
                            ? `${procedure.color} border-gray-700 ring-2 ring-blue-300` 
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                          }
                        `}
                        onClick={() => {
                          if (procedure.value === 'filling') {
                            setSelectedProcedure('filling');
                          } else if (procedure.value === 'scaling') {
                            // Handle scaling - select all teeth in same arch
                            const isUpperTooth = selectedTooth >= 11 && selectedTooth <= 28;
                            const archTeeth = isUpperTooth ? teethLayout.upper : teethLayout.lower;
                            
                            const newStatus = { ...teethStatus };
                            archTeeth.forEach(tooth => {
                              newStatus[tooth] = { status: 'scaling', surfaces: [] };
                            });
                            setTeethStatus(newStatus);
                            setShowProcedureModal(false);
                            setSelectedProcedure('');
                            setSelectedSurfaces([]);
                            setProcedureNotes('');
                            setSelectedTooth(null);
                          } else {
                            setTeethStatus(prev => ({
                              ...prev,
                              [selectedTooth]: {
                                status: procedure.value,
                                surfaces: []
                              }
                            }));
                            setShowProcedureModal(false);
                            setSelectedProcedure('');
                            setSelectedSurfaces([]);
                            setProcedureNotes('');
                            setSelectedTooth(null);
                          }
                        }}
                      >
                        <div className="font-semibold">{procedure.label}</div>
                        <div className="text-xs mt-1 opacity-75">{procedure.thai}</div>
                        {procedure.value === 'filling' && (
                          <div className="text-xs mt-1 text-blue-600 font-medium">
                            Select surfaces below ↓
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Visual Tooth Surface Selection */}
              {selectedProcedure === 'filling' && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Select Tooth Surfaces (for Filling):</h4>
                  
                  {/* Interactive Tooth Diagram */}
                  <div className="flex justify-center mb-3">
                    <div className="relative">
                      <svg width={isMobile ? "160" : "200"} height={isMobile ? "120" : "160"} viewBox="0 0 200 160" className="border-2 border-gray-200 rounded-lg bg-gray-50">
                        {/* Tooth outline */}
                        <rect x="70" y="40" width="60" height="80" rx="8" fill="white" stroke="#d1d5db" strokeWidth="2"/>
                        
                        {/* Surface areas - clickable */}
                        {/* Palatal/Lingual (Top) */}
                        <rect 
                          x="70" y="20" width="60" height="25" rx="8" 
                          fill={selectedSurfaces.includes('palatal') || selectedSurfaces.includes('lingual') ? '#3b82f6' : '#f3f4f6'} 
                          stroke="#d1d5db" strokeWidth="1"
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                          onMouseLeave={(e) => e.target.style.opacity = '1'}
                          onClick={() => {
                            const surfaceKey = selectedTooth >= 11 && selectedTooth <= 28 ? 'palatal' : 'lingual';
                            setSelectedSurfaces(prev => 
                              prev.includes(surfaceKey)
                                ? prev.filter(s => s !== surfaceKey)
                                : [...prev, surfaceKey]
                            );
                          }}
                        />
                        
                        {/* Distal (Right) */}
                        <rect 
                          x="125" y="40" width="25" height="80" rx="8" 
                          fill={selectedSurfaces.includes('distal') ? '#f97316' : '#f3f4f6'} 
                          stroke="#d1d5db" strokeWidth="1"
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                          onMouseLeave={(e) => e.target.style.opacity = '1'}
                          onClick={() => {
                            setSelectedSurfaces(prev => 
                              prev.includes('distal')
                                ? prev.filter(s => s !== 'distal')
                                : [...prev, 'distal']
                            );
                          }}
                        />
                        
                        {/* Buccal/Labial (Bottom) */}
                        <rect 
                          x="70" y="115" width="60" height="25" rx="8" 
                          fill={selectedSurfaces.includes('buccal') || selectedSurfaces.includes('labial') ? '#10b981' : '#f3f4f6'} 
                          stroke="#d1d5db" strokeWidth="1"
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                          onMouseLeave={(e) => e.target.style.opacity = '1'}
                          onClick={() => {
                            const isAnterior = (selectedTooth >= 11 && selectedTooth <= 13) || 
                                              (selectedTooth >= 21 && selectedTooth <= 23) ||
                                              (selectedTooth >= 31 && selectedTooth <= 33) || 
                                              (selectedTooth >= 41 && selectedTooth <= 43);
                            const surfaceKey = isAnterior ? 'labial' : 'buccal';
                            setSelectedSurfaces(prev => 
                              prev.includes(surfaceKey)
                                ? prev.filter(s => s !== surfaceKey)
                                : [...prev, surfaceKey]
                            );
                          }}
                        />
                        
                        {/* Mesial (Left) */}
                        <rect 
                          x="50" y="40" width="25" height="80" rx="8" 
                          fill={selectedSurfaces.includes('mesial') ? '#ec4899' : '#f3f4f6'} 
                          stroke="#d1d5db" strokeWidth="1"
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                          onMouseLeave={(e) => e.target.style.opacity = '1'}
                          onClick={() => {
                            setSelectedSurfaces(prev => 
                              prev.includes('mesial')
                                ? prev.filter(s => s !== 'mesial')
                                : [...prev, 'mesial']
                            );
                          }}
                        />
                        
                        {/* Occlusal/Incisal (Center) */}
                        <rect 
                          x="85" y="65" width="30" height="30" rx="4" 
                          fill={selectedSurfaces.includes('occlusal') || selectedSurfaces.includes('incisal') ? '#eab308' : '#f3f4f6'} 
                          stroke="#d1d5db" strokeWidth="1"
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                          onMouseLeave={(e) => e.target.style.opacity = '1'}
                          onClick={() => {
                            const isAnterior = (selectedTooth >= 11 && selectedTooth <= 13) || 
                                              (selectedTooth >= 21 && selectedTooth <= 23) ||
                                              (selectedTooth >= 31 && selectedTooth <= 33) || 
                                              (selectedTooth >= 41 && selectedTooth <= 43);
                            const surfaceKey = isAnterior ? 'incisal' : 'occlusal';
                            setSelectedSurfaces(prev => 
                              prev.includes(surfaceKey)
                                ? prev.filter(s => s !== surfaceKey)
                                : [...prev, surfaceKey]
                            );
                          }}
                        />
                        
                        {/* Surface Labels */}
                        <text x="100" y="35" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#374151">
                          {selectedSurfaces.includes('palatal') || selectedSurfaces.includes('lingual') ? 
                            (selectedTooth >= 11 && selectedTooth <= 28 ? 'P' : 'Li') : ''}
                        </text>
                        <text x="137" y="85" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#374151">
                          {selectedSurfaces.includes('distal') ? 'D' : ''}
                        </text>
                        <text x="100" y="135" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#374151">
                          {selectedSurfaces.includes('buccal') || selectedSurfaces.includes('labial') ? 
                            ((selectedTooth >= 11 && selectedTooth <= 13) || 
                             (selectedTooth >= 21 && selectedTooth <= 23) ||
                             (selectedTooth >= 31 && selectedTooth <= 33) || 
                             (selectedTooth >= 41 && selectedTooth <= 43) ? 'La' : 'B') : ''}
                        </text>
                        <text x="62" y="85" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#374151">
                          {selectedSurfaces.includes('mesial') ? 'M' : ''}
                        </text>
                        <text x="100" y="85" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#374151">
                          {selectedSurfaces.includes('occlusal') || selectedSurfaces.includes('incisal') ? 
                            ((selectedTooth >= 11 && selectedTooth <= 13) || 
                             (selectedTooth >= 21 && selectedTooth <= 23) ||
                             (selectedTooth >= 31 && selectedTooth <= 33) || 
                             (selectedTooth >= 41 && selectedTooth <= 43) ? 'I' : 'O') : ''}
                        </text>
                        
                        {/* Labels around the tooth */}
                        <text x="100" y="15" textAnchor="middle" fontSize="10" fill="#6b7280">
                          {selectedTooth >= 11 && selectedTooth <= 28 ? 'Palatal' : 'Lingual'}
                        </text>
                        <text x="160" y="85" textAnchor="middle" fontSize="10" fill="#6b7280">Distal</text>
                        <text x="100" y="155" textAnchor="middle" fontSize="10" fill="#6b7280">
                          {((selectedTooth >= 11 && selectedTooth <= 13) || 
                            (selectedTooth >= 21 && selectedTooth <= 23) ||
                            (selectedTooth >= 31 && selectedTooth <= 33) || 
                            (selectedTooth >= 41 && selectedTooth <= 43)) ? 'Labial' : 'Buccal'}
                        </text>
                        <text x="40" y="85" textAnchor="middle" fontSize="10" fill="#6b7280">Mesial</text>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Checkbox list for confirmation */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {getToothSurfaces(selectedTooth).map((surface) => (
                      <label key={surface.value} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                        <input
                          type="checkbox"
                          checked={selectedSurfaces.includes(surface.value)}
                          onChange={() => {
                            setSelectedSurfaces(prev => 
                              prev.includes(surface.value)
                                ? prev.filter(s => s !== surface.value)
                                : [...prev, surface.value]
                            );
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div className={`w-3 h-3 rounded ${surface.color}`}></div>
                        <span className="font-medium">{surface.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Notes */}
              {selectedProcedure === 'filling' && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Additional Notes:</h4>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows={isMobile ? 1 : 2}
                    value={procedureNotes}
                    onChange={(e) => setProcedureNotes(e.target.value)}
                    placeholder="Add additional details..."
                  />
                </div>
              )}
            </div>
            
            <div className={`${isMobile ? 'p-3' : 'p-4'} border-t flex-shrink-0`}>
              <div className="flex space-x-3">
                <button
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  onClick={() => {
                    // Reset tooth status to healthy when canceling
                    setTeethStatus(prev => ({
                      ...prev,
                      [selectedTooth]: { status: 'healthy', surfaces: [] }
                    }));
                    setShowProcedureModal(false);
                    setSelectedProcedure('');
                    setSelectedSurfaces([]);
                    setProcedureNotes('');
                    setSelectedTooth(null);
                  }}
                >
                  Cancel
                </button>
                {selectedProcedure === 'filling' && (
                  <button
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedSurfaces.length > 0 
                        ? 'bg-orange-600 text-white hover:bg-orange-700' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={() => {
                      if (selectedSurfaces.length > 0) {
                        setTeethStatus(prev => ({
                          ...prev,
                          [selectedTooth]: {
                            status: 'filling',
                            surfaces: selectedSurfaces
                          }
                        }));
                        setShowProcedureModal(false);
                        setSelectedProcedure('');
                        setSelectedSurfaces([]);
                        setProcedureNotes('');
                        setSelectedTooth(null);
                      }
                    }}
                    disabled={selectedSurfaces.length === 0}
                  >
                    Fill Tooth
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DentalTreatmentPlanner;