﻿using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data
{
    public class Encrypt
    {

        public static string DecryptAESString(string cipherText, string key, string IVKey)
        {
            var keybytes = System.Text.Encoding.UTF8.GetBytes(key);
            var iv = Encoding.UTF8.GetBytes(IVKey);

            var encrypted = Convert.FromBase64String(cipherText);
            var decriptedFromJavascript = DecryptStringFromBytes(encrypted, keybytes, iv);
            return string.Format(decriptedFromJavascript);
        }


        private static string DecryptStringFromBytes(byte[] cipherText, byte[] key, byte[] iv)
        {
            // Check arguments.  
            if (cipherText == null || cipherText.Length <= 0)
            {
                throw new ArgumentNullException("cipherText");
            }
            if (key == null || key.Length <= 0)
            {
                throw new ArgumentNullException("key");
            }
            if (iv == null || iv.Length <= 0)
            {
                throw new ArgumentNullException("key");
            }

            // Declare the string used to hold  
            // the decrypted text.  
            string plaintext = null;

            // Create an RijndaelManaged object  
            // with the specified key and IV.  
            using (var rijAlg = new RijndaelManaged())
            {
                //Settings  
                rijAlg.Mode = CipherMode.CBC;
                rijAlg.Padding = PaddingMode.PKCS7;
                rijAlg.FeedbackSize = 128;

                rijAlg.Key = key;
                rijAlg.IV = iv;

                // Create a decrytor to perform the stream transform.  
                var decryptor = rijAlg.CreateDecryptor(rijAlg.Key, rijAlg.IV);

                try
                {
                    // Create the streams used for decryption.  
                    using (var msDecrypt = new MemoryStream(cipherText))
                    {
                        using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                        {

                            using (var srDecrypt = new StreamReader(csDecrypt))
                            {
                                // Read the decrypted bytes from the decrypting stream  
                                // and place them in a string.  
                                plaintext = srDecrypt.ReadToEnd();

                            }

                        }
                    }
                }
                catch
                {
                    plaintext = "keyError";
                }
            }

            return plaintext;
        }

        

        byte[] EncryptStringToBytes(string plainText, byte[] key, byte[] iv)
        {
            // Check arguments.  
            if (plainText == null || plainText.Length <= 0)
            {
                throw new ArgumentNullException("plainText");
            }
            if (key == null || key.Length <= 0)
            {
                throw new ArgumentNullException("key");
            }
            if (iv == null || iv.Length <= 0)
            {
                throw new ArgumentNullException("key");
            }
            byte[] encrypted;
            // Create a RijndaelManaged object  
            // with the specified key and IV.  
            using (var rijAlg = new RijndaelManaged())
            {
                rijAlg.Mode = CipherMode.CBC;
                rijAlg.Padding = PaddingMode.PKCS7;
                rijAlg.FeedbackSize = 128;

                rijAlg.Key = key;
                rijAlg.IV = iv;

                // Create a decrytor to perform the stream transform.  
                var encryptor = rijAlg.CreateEncryptor(rijAlg.Key, rijAlg.IV);

                // Create the streams used for encryption.  
                using (var msEncrypt = new MemoryStream())
                {
                    using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    {
                        using (var swEncrypt = new StreamWriter(csEncrypt))
                        {
                            //Write all data to the stream.  
                            swEncrypt.Write(plainText);
                        }
                        encrypted = msEncrypt.ToArray();
                    }
                }
            }

            // Return the encrypted bytes from the memory stream.  
            return encrypted;
        }

        public static string FormatCipher(string prefix, string cipher, string salt, int saltIndexPosition) 
        {
            string saltPart1 = salt.Substring(0, 10);
            string saltPart2 = salt.Substring(10);


            StringBuilder cipherStringBuilder = new StringBuilder();
            cipherStringBuilder.Append(prefix);
            
           
            StringBuilder cipherBodyStringBuilder = new StringBuilder();
            cipherBodyStringBuilder.Append(cipher);
            cipherBodyStringBuilder.Insert(saltIndexPosition, saltPart1);
            cipherBodyStringBuilder.Insert(saltPart1.Length + 1 + saltIndexPosition, saltPart2);

            cipherStringBuilder.Append(cipherBodyStringBuilder);

            string cipherString = cipherStringBuilder.ToString();

            return cipherString;
        }

        public static string generateRandomSALT()
        {
            StringBuilder builder = new StringBuilder();
            builder.Append(RandomString(5, true));
            builder.Append(RandomNumber(100000, 999999));
            builder.Append(RandomString(5, false));
            return builder.ToString();
        }


        public static string generateExcludeCharacters()
        {
            StringBuilder builder = new StringBuilder();
            builder.Append(RandomString(1, false));
            builder.Append(RandomNumber(0, 9));
            builder.Append(RandomString(1, true));
            return builder.ToString();
        }



        public static string refineTheSALT(string SALT, string excludedText)
        {
            //Regex rgx = new Regex(excludedText);
            //string refinedSALT = rgx.Replace(SALT, "");
            StringBuilder saltToBeRefined = new StringBuilder();
            saltToBeRefined.Append(SALT);
            StringBuilder excludedTextArray = new StringBuilder(excludedText);

            for(int i=0;  i<excludedTextArray.Length; i++)
            {
                saltToBeRefined.Replace(excludedTextArray[i].ToString(), "");
            }

            return saltToBeRefined.ToString();
        }

        public static string generatePossitionString()
        {
            StringBuilder builder = new StringBuilder();
            builder.Append(RandomString(1, false));
            builder.Append(RandomString(1, true));
            return builder.ToString();
        }

        public static int calculateInsertPossition(string positionString)
        {
            int position = 0;
            char[] charArray = positionString.ToArray();
            foreach(var letter in charArray)
            {
                int charValue = System.Convert.ToInt32(letter);
                position = position + charValue;
            }
            return position % 3;
        }

        // Generate the random string with a given size and case.   
        // If the second parameter is true, the return string is lowercase  

        private static string RandomString(int size, bool lowerCase)
        {
            StringBuilder builder = new StringBuilder();
            Random random = new Random();
            char ch;
            for (int i = 0; i < size; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }
            if (lowerCase)
                return builder.ToString().ToLower();
            return builder.ToString();
        }

        // Generate a random number between two numbers    
        private static int RandomNumber(int min, int max)
        {
            Random random = new Random();
            return random.Next(min, max);
        }

        public static string EncryptAndEncode(string raw, string IV, string PASSWORD)
        {
            
            //generate the position string 
            string positionString = generatePossitionString();
            

            //calculate the position
            int positionToInsert = calculateInsertPossition(positionString);

            //generate Full SALT of 16Char
            string salt = generateRandomSALT();

            //generate the exclude char
            string excludeText = generateExcludeCharacters();

            //filter the SALT with the above
            string refinedSALT = refineTheSALT(salt, excludeText);

            

            string encrypted = "";
            using ( var csp = new AesCryptoServiceProvider())
            {
                ICryptoTransform e = GetCryptoTransform(csp, true, IV, PASSWORD, refinedSALT);
                byte[] inputBuffer = Encoding.UTF8.GetBytes(raw);
                byte[] output = e.TransformFinalBlock(inputBuffer, 0, inputBuffer.Length);
                encrypted = Convert.ToBase64String(output);
                
            }

            return FormatCipher(positionString+excludeText, encrypted, salt, positionToInsert);
        }


        //public static string DecodeAndDecrypt(string encrypted, string IV, string PASSWORD, string SALT)
        public static string DecodeAndDecrypt(string encrypted, string IV, string PASSWORD)
        {
            try
            {
                //Cipher PART 1 for Position string & Removel text for the SALT
                var positionString = encrypted.Substring(0, 2);
                var positionToInsert = calculateInsertPossition(positionString);
                var removalString = encrypted.Substring(2, 3);

                var cipherPart2 = encrypted.Substring(5, encrypted.Length - 5);
                var saltPart1 = cipherPart2.Substring(positionToInsert, 10);
                var saltPart2 = cipherPart2.Substring(positionToInsert + saltPart1.Length + 1, 6);
                var salt = saltPart1 + saltPart2;

                StringBuilder refinedCipher = new StringBuilder(cipherPart2);
                refinedCipher.Replace(saltPart1, "");
                refinedCipher.Replace(saltPart2, "");
                var refinedSalt = refineTheSALT(salt, removalString);
                string refinedCipherStr = refinedCipher.ToString();

                using (var csp = new AesCryptoServiceProvider())
                {
                    var d = GetCryptoTransform(csp, false, IV, PASSWORD, refinedSalt);
                    byte[] output = Convert.FromBase64String(refinedCipher.ToString());
                    byte[] decryptedOutput = d.TransformFinalBlock(output, 0, output.Length);
                    string decypted = Encoding.UTF8.GetString(decryptedOutput);
                    return decypted;
                }
            }
            catch(Exception)
            {
                return "Unauthorized Access";
            }
            
        }


        private static ICryptoTransform GetCryptoTransform(AesCryptoServiceProvider csp, bool encrypting, string IV, string PASSWORD, string SALT)
        {
            csp.Mode = CipherMode.CBC;
            csp.Padding = PaddingMode.PKCS7;
            var spec = new Rfc2898DeriveBytes(Encoding.UTF8.GetBytes(PASSWORD), Encoding.UTF8.GetBytes(SALT), 65536);
            byte[] key = spec.GetBytes(16);


            csp.IV = Encoding.UTF8.GetBytes(IV);
            csp.Key = key;
            if (encrypting)
            {
                return csp.CreateEncryptor();
            }
            return csp.CreateDecryptor();
        }
    }
}
