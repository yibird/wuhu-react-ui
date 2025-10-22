/**
 * 复制文本到剪贴板
 * @returns 返回一个对象,对象包含copied和copyText两个属性,copyText函数用于复制文本,
 * copied表示是否复制成功
 */
export function useCopy() {
  function copyText(text: string): Promise<{ copied: boolean }> {
    if (!text) return Promise.resolve({ copied: false });
    if (navigator.clipboard && window.isSecureContext) {
      return new Promise<{ copied: boolean }>((resolve) => {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            resolve({ copied: true });
          })
          .catch(() => {
            resolve({ copied: false });
          });
      });
    }
    // 回退方案：execCommand
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    return new Promise<{ copied: boolean }>((resolve) => {
      try {
        const copied = document.execCommand('copy');
        resolve({ copied });
      } finally {
        document.body.removeChild(textarea);
      }
    });
  }
  return {
    copyText,
  };
}
