import { init, addItem, getItems, deleteItem } from "./Web3Client";

export function updateTransactionStatus(message) {
  if (message === "pending") {
    document.getElementById("pending").style.display = "flex";
    document.getElementById("pending").style.transform = "scale(1)";
    document.getElementById("success").style.transform = "scale(0)";
    document.getElementById("rejected").style.transform = "scale(0)";
    document.getElementById("initiate").style.transform = "scale(0)";
  } else if (message === "success") {
    document.getElementById("pending").style.transform = "scale(0)";
    document.getElementById("rejected").style.transform = "scale(0)";
    document.getElementById("initiate").style.transform = "scale(0)";
    document.getElementById("success").style.display = "flex";
    document.getElementById("success").style.transform = "scale(1)";
    clearTx(message);
  } else if (message === "rejected") {
    document.getElementById("pending").style.transform = "scale(0)";
    document.getElementById("success").style.transform = "scale(0)";
    document.getElementById("initiate").style.transform = "scale(0)";

    document.getElementById("rejected").style.display = "flex";
    document.getElementById("rejected").style.transform = "scale(1)";
  } else if (message === "initiate") {
    document.getElementById("pending").style.transform = "scale(0)";
    document.getElementById("success").style.transform = "scale(0)";
    document.getElementById("rejected").style.transform = "scale(0)";

    document.getElementById("initiate").style.display = "flex";
    document.getElementById("initiate").style.transform = "scale(1)";
  }
}
export function successfulTransaction() {
  updateTransactionStatus("success");
}
export function failedTransaction() {
  updateTransactionStatus("rejected");
}
export async function initiateApp(props) {
  await init(props);
}

export function clearTx(msg) {
  setTimeout(() => {
    document.getElementById(msg).style.transform = "scale(0)";
    document.getElementById(msg).style.display = "none";
  }, 3000);
}
