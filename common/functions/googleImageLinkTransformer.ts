export default function getGDriveImgLinkToPreview(link: string) {
  if (!!link) {
    const match = link?.match(/\/file\/d\/([a-zA-Z0-9_-]+)\//);
    const fileId = match ? match[1] : null;
    const googleDriveLink = `https://drive.google.com/uc?id=0B0n6xZEijWERVVVROW5FZ0ZaMlNEc2lxQk1TZ3J0X2Q4MUJ3&export=view`;
    // const googleDriveLink = `https://drive.google.com/uc?id=${fileId}&export=view`;
    return googleDriveLink
  } else {
    return "";
  }
}
