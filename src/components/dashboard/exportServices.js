import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { jsPDF } from 'jspdf';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export async function handleExportPDF() {
  const snapshot = await getDocs(collection(db, 'trainees'));
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text('KSP Rwanda – Trainee Report', 20, 20);
  doc.setFontSize(12);

  let y = 30;
  snapshot.forEach((trainee, index) => {
    const data = trainee.data();
    doc.text(`Name: ${data.name}`, 20, y);
    doc.text(`Email: ${data.email}`, 20, y + 6);
    doc.text(`Progress: ${data.progress || '0%'} | Score: ${data.score || '-'}`, 20, y + 12);
    y += 24;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save('trainee_report.pdf');
}
export async function handleExportCSV() {
  const snapshot = await getDocs(collection(db, 'trainees'));
  const rows = [['Name', 'Email', 'Progress', 'Score']];

  snapshot.forEach(doc => {
    const data = doc.data();
    rows.push([
      data.name,
      data.email,
      `${data.progress || 0}%`,
      data.score || '-'
    ]);
  });

  const csvContent = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'trainee_data.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}