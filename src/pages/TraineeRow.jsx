// TraineeRow.jsx
export default function TraineeRow({ trainee }) {
  return (
    <tr>
      <td><img src={trainee.profileUrl || 'default.jpg'} alt="profile" /></td>
      <td>{trainee.name}</td>
      <td>{trainee.email}</td>
      <td>{trainee.progress || '0%'}</td>
      <td>{trainee.score || '-'}</td>
    </tr>
  );
}